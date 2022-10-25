import requests

product_id= 11

endpoint = f"http://localhost:8000/api/customers/{product_id}/delete/"


get_response = requests.delete(endpoint)
print(get_response.status_code)
