"""Service replying to user utterance."""

from transformers import BlenderbotForConditionalGeneration, BlenderbotTokenizer


_MODEL_NAME = 'facebook/blenderbot-400M-distill'

class ConversationService:
    
    def prepare(self):
        self._model = BlenderbotForConditionalGeneration.from_pretrained(_MODEL_NAME)
        self._tokenizer = BlenderbotTokenizer.from_pretrained(_MODEL_NAME)
    
    
    def generate_reply(self, utterance: str, max_new_tokens: int = 120) -> str:
        inputs = self._tokenizer([utterance], return_tensors="pt")
        reply_ids = self._model.generate(**inputs, max_new_tokens=max_new_tokens)
        
        return self._tokenizer.batch_decode(reply_ids, skip_special_tokens=True)[0]