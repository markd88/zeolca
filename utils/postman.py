import requests

name = 'testname01'
word = 'testword'

url = 'http://127.0.0.1:5000/api/login'
myobj = {'username': name, 'password': word}

x = requests.post(url, json = myobj)

print(x.text)