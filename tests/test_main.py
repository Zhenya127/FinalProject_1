from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    
def test_generate_reply():
    passed_text = 'Hello! What is your name?'
    response = client.post('/generate-reply/', json={'utterance': passed_text})

    assert response.status_code == 200

    assert response.status_code == 200
    assert response.json()['reply'] != ''

def test_generate_reply_empty():
    passed_text = ''
    response = client.post('/generate-reply/', json={'utterance': passed_text})
    assert response.status_code == 200
    assert response.json()['reply'] != ''

