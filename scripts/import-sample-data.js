const { MongoClient } = require('mongodb');

const sampleData = [
  {
    "Restaurant Name": "Blacksburg Bistro",
    "Inspection Date": "2023-10-15",
    "Score": 95,
    "Grade": "A",
    "Latitude": 37.2296,
    "Longitude": -80.4139,
    "Address": "123 Main Street",
    "City": "Blacksburg",
    "State": "VA",
    "Zip Code": "24060",
    "Phone Number": "(540) 555-1234",
    "Violations": ["Food contact surfaces not properly cleaned and sanitized"],
    "Critical Violations": 0,
    "Non-Critical Violations": 1,
    "Total Violations": 1,
    "Inspector Name": "John Smith",
    "Inspection Type": "Routine",
    "Status": "Pass"
  },
  {
    "Restaurant Name": "Hokie Grill",
    "Inspection Date": "2023-09-20",
    "Score": 92,
    "Grade": "A",
    "Latitude": 37.2270,
    "Longitude": -80.4220,
    "Address": "456 College Ave",
    "City": "Blacksburg",
    "State": "VA",
    "Zip Code": "24060",
    "Phone Number": "(540) 555-2345",
    "Violations": ["Improper cold holding temperatures for potentially hazardous food"],
    "Critical Violations": 1,
    "Non-Critical Violations": 0,
    "Total Violations": 1,
    "Inspector Name": "Jane Doe",
    "Inspection Type": "Routine",
    "Status": "Pass"
  },
  {
    "Restaurant Name": "Sushi Paradise",
    "Inspection Date": "2023-08-05",
    "Score": 86,
    "Grade": "B",
    "Latitude": 37.2310,
    "Longitude": -80.4170,
    "Address": "789 Draper Rd",
    "City": "Blacksburg",
    "State": "VA",
    "Zip Code": "24060",
    "Phone Number": "(540) 555-3456",
    "Violations": [
      "Evidence of pests observed in food preparation area",
      "Handwashing sink not accessible or supplied properly"
    ],
    "Critical Violations": 1,
    "Non-Critical Violations": 1,
    "Total Violations": 2,
    "Inspector Name": "Mike Johnson",
    "Inspection Type": "Routine",
    "Status": "Pass"
  },
  {
    "Restaurant Name": "Taco Town",
    "Inspection Date": "2023-11-01",
    "Score": 94,
    "Grade": "A",
    "Latitude": 37.2350,
    "Longitude": -80.4100,
    "Address": "101 Progress St",
    "City": "Blacksburg",
    "State": "VA",
    "Zip Code": "24060",
    "Phone Number": "(540) 555-4567",
    "Violations": [],
    "Critical Violations": 0,
    "Non-Critical Violations": 0,
    "Total Violations": 0,
    "Inspector Name": "Sarah Wilson",
    "Inspection Type": "Routine",
    "Status": "Pass"
  },
  {
    "Restaurant Name": "Pizza Palace",
    "Inspection Date": "2023-10-10",
    "Score": 97,
    "Grade": "A",
    "Latitude": 37.2290,
    "Longitude": -80.4160,
    "Address": "202 Turner St",
    "City": "Blacksburg",
    "State": "VA",
    "Zip Code": "24060",
    "Phone Number": "(540) 555-5678",
    "Violations": [],
    "Critical Violations": 0,
    "Non-Critical Violations": 0,
    "Total Violations": 0,
    "Inspector Name": "Tom Brown",
    "Inspection Type": "Routine",
    "Status": "Pass"
  }
];

async function importSampleData() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dine-safe';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('inspections');

    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const result = await collection.insertMany(sampleData);
    console.log(`Inserted ${result.insertedCount} documents`);

    // Create indexes for better performance
    await collection.createIndex({ "Restaurant Name": 1 });
    await collection.createIndex({ "Inspection Date": -1 });
    await collection.createIndex({ Score: -1 });
    await collection.createIndex({ Grade: 1 });
    console.log('Created indexes');

    console.log('Sample data imported successfully!');
  } catch (error) {
    console.error('Error importing sample data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the import if this script is executed directly
if (require.main === module) {
  importSampleData();
}

module.exports = { importSampleData }; 