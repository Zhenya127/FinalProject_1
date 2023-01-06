"""
`/generate-reply` request/response body models.
"""

from pydantic import BaseModel


class GenerateReplyRequestBodyModel(BaseModel):
    utterance: str

class GenerateReplyResponseBodyModel(BaseModel):
    reply: str