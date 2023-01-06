"""
`/generate-reply` request body model.
"""

from pydantic import BaseModel


class GenerateReplyRequestBodyModel(BaseModel):
    utterance: str

class GenerateReplyResponseBodyModel(BaseModel):
    reply: str