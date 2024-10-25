import sys
import os
import torch
from torch.utils.data import DataLoader
from torchvision import transforms
from torchvision.models.detection import FasterRCNN

# Add the project root directory to the Python path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

# Import the dataset and model using the updated paths
from data.dataset import PotholeDataset
from models.rcnn_model import create_rcnn_model

# Define dataset path
image_dir = r'C:\Users\Lenovo\Desktop\newproject\archive (5)\pothole_image_data\Pothole_Image_Data'

# Define any required transformations
transform = transforms.Compose([
    transforms.Resize((300, 300)),  # Resize images to a fixed size
    transforms.ToTensor(),            # Convert PIL images to tensors
])

# Create dataset and DataLoader
dataset = PotholeDataset(image_dir, transform=transform)
data_loader = DataLoader(dataset, batch_size=4, shuffle=True, num_workers=4, collate_fn=lambda x: tuple(zip(*x)))


# Use GPU if available
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

# Get the model with 2 classes (background + pothole)
model = create_rcnn_model(num_classes=2)
model.to(device)  # This should now work correctly

# Optimizer
optimizer = torch.optim.Adam([p for p in model.parameters() if p.requires_grad], lr=0.001)

# Training loop
num_epochs = 10
for epoch in range(num_epochs):
    model.train()
    epoch_loss = 0
    for images, targets in data_loader:
        images = [img.to(device) for img in images]
        targets = [{k: v.to(device) for k, v in t.items()} for t in targets]

        optimizer.zero_grad()
        loss_dict = model(images, targets)
        losses = sum(loss for loss in loss_dict.values())
        losses.backward()
        optimizer.step()

        epoch_loss += losses.item()

    print(f"Epoch {epoch + 1}, Loss: {epoch_loss / len(data_loader)}")

# Save the trained model
torch.save(model.state_dict(), './saved_models/faster_rcnn_pothole.pth')
