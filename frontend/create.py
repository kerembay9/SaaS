import requests

endpoint = "http://localhost:8000/api/customers/"

data = {
    "name":"Jason",
    "surname":"Mraz",
    "purchase":"Negative",
    "total_revenue": 1230.43

}

get_response = requests.post(endpoint, json=data)
print(get_response.json())
