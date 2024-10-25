from flask import Flask, request, jsonify
import torch
import cv2
from models.faster_rcnn_model import get_faster_rcnn_model

app = Flask(__name__)

# Load the model
model = get_faster_rcnn_model(num_classes=2)
model.load_state_dict(torch.load('./saved_models/faster_rcnn_pothole.pth'))
model.eval()

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    
    # Save the uploaded file
    file_path = './uploads/' + file.filename
    file.save(file_path)
    
    # Load and predict
    img = cv2.imread(file_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_tensor = torch.as_tensor(img_rgb / 255., dtype=torch.float32).unsqueeze(0)

    with torch.no_grad():
        predictions = model(img_tensor)[0]
    
    boxes = predictions['boxes'].cpu().numpy().tolist()
    scores = predictions['scores'].cpu().numpy().tolist()
    
    result = {"boxes": boxes, "scores": scores}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
