from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from starlette.status import HTTP_302_FOUND


from source.conversation_service import ConversationService
from source.generate_reply_model import GenerateReplyRequestBodyModel, GenerateReplyResponseBodyModel


service = ConversationService()
service.prepare()
app = FastAPI()


@app.get("/")
def root():
    '''Redirect home route to the client app'''
    return RedirectResponse(url="/client/index.html", status_code=HTTP_302_FOUND)


@app.post('/generate-reply/', response_model=GenerateReplyResponseBodyModel)
async def reply_to_user_utterance(request_body: GenerateReplyRequestBodyModel):
    reply = service.generate_reply(request_body.utterance)

    return GenerateReplyResponseBodyModel(reply=reply)


app.mount("/client", StaticFiles(directory="client"), name="client")
