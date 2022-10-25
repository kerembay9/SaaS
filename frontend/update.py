import requests

endpoint = "http://localhost:8000/api/customers/1/update/"

data = {
    "name": "KeRem",
    "total_revenue": 899000.56
}

get_response = requests.put(endpoint, json=data)
print(get_response.json())
