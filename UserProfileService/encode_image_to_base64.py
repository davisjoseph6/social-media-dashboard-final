import base64
import json

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string

def create_json_payload(image_path, user_id, name, email):
    encoded_image = encode_image_to_base64(image_path)
    payload = {
        "userId": user_id,
        "name": name,
        "email": email,
        "profilePicture": encoded_image
    }
    return json.dumps(payload, indent=4)

# Example usage
image_path = './test_image/valid_image.jpg'  # Adjust this path as necessary
user_id = "testuser@example.com"
name = "Test User"
email = "testuser@example.com"

json_payload = create_json_payload(image_path, user_id, name, email)
print(json_payload)

