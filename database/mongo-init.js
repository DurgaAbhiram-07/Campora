db = db.getSiblingDB('campora_db');

db.createCollection('users');
db.createCollection('products');
db.createCollection('categories');
db.createCollection('chats');
db.createCollection('messages');
db.createCollection('notifications');
db.createCollection('reports');

db.users.createIndex({ "collegeId": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "status": 1 });

print("Campora MongoDB database initialized with indexes.");
