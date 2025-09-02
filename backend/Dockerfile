# Use official Python image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements.txt first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of the backend code
COPY . .

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
