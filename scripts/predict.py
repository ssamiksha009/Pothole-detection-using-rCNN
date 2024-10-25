# scripts/predict.py
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load the model
model = tf.keras.models.load_model('./saved_models/pothole_detector_rcnn.h5')

def predict(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    predictions = model.predict(img_array)
    return np.argmax(predictions)

# Example usage
result = predict(r'path_to_new_image.jpg')
print("Predicted class:", result)
