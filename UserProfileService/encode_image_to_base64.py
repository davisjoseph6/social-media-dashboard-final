import base64

def encode_image_to_base64(image_path, output_file):
    """
    Encodes an image to base64 and writes the encoded string to a file.

    Parameters:
    - image_path: Path to the image file to encode.
    - output_file: Path to the output file where the encoded string will be saved.
    """
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    with open(output_file, "w") as file:
        file.write(encoded_string)

# Example usage
image_path = './test_image/valid_image.jpg'  # Change this to the path of your image file
output_file = './encoded_image.txt'  # Path to the output file for the encoded string
encode_image_to_base64(image_path, output_file)

