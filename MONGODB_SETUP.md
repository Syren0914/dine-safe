# MongoDB Integration Setup

This guide will help you set up MongoDB integration to fetch inspection data directly from your local MongoDB database.

## Prerequisites

1. MongoDB installed and running locally on `mongodb://localhost:27017/`
2. Node.js and npm/pnpm installed
3. Your inspection data imported into MongoDB

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dine-safe

# Mapbox Configuration (if you're using it)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here

# Other environment variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
CLERK_SECRET_KEY=your_clerk_secret_here
```

### 2. Database Setup

1. Start your MongoDB server:
   ```bash
   mongod
   ```

2. Connect to MongoDB and create your database:
   ```bash
   mongosh
   use dine-safe
   ```

3. Create a collection for inspections:
   ```javascript
   db.createCollection('inspections')
   ```

### 3. Import Your Inspection Data

You can import your inspection data using MongoDB Compass or the command line:

**Using mongoimport:**
```bash
mongoimport --db dine-safe --collection inspections --file your_inspection_data.json
```

**Using MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017/`
3. Select the `dine-safe` database
4. Import your JSON file into the `inspections` collection

### 4. Expected Data Structure

Your inspection data should follow this structure:

```json
{
  "Restaurant Name": "Restaurant Name",
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
  "Violations": ["Violation 1", "Violation 2"],
  "Critical Violations": 0,
  "Non-Critical Violations": 2,
  "Total Violations": 2,
  "Inspector Name": "John Doe",
  "Inspection Type": "Routine",
  "Status": "Pass"
}
```

### 5. API Endpoints

The following API endpoints are now available:

#### GET /api/inspections
Fetch inspection data with optional filters:

```javascript
// Get all inspections
fetch('/api/inspections')

// Get inspections for a specific restaurant
fetch('/api/inspections?restaurantName=Restaurant Name')

// Get inspections with grade filter
fetch('/api/inspections?grade=A')

// Get inspections with score range
fetch('/api/inspections?minScore=90&maxScore=100')

// Get inspections with date range
fetch('/api/inspections?startDate=2023-01-01&endDate=2023-12-31')

// Get inspections with pagination
fetch('/api/inspections?limit=50&skip=0')

// Sort inspections
fetch('/api/inspections?sortBy=Score&sortOrder=desc')
```

#### POST /api/inspections
Add new inspection data:

```javascript
fetch('/api/inspections', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "Restaurant Name": "New Restaurant",
    "Inspection Date": "2023-12-01",
    "Score": 92,
    "Grade": "A",
    "Address": "456 New Street",
    "City": "Blacksburg",
    "State": "VA"
  })
})
```

### 6. Utility Functions

The following utility functions are available in `lib/inspection-utils.ts`:

- `transformInspectionToRestaurant()` - Convert MongoDB inspection data to Restaurant format
- `transformInspectionsToRestaurants()` - Convert array of inspections to restaurants
- `getHealthGradeColorClass()` - Get CSS classes for health grade colors
- `getHealthGradeColor()` - Get color name for health grade
- `formatInspectionDate()` - Format inspection date
- `getViolationSeverity()` - Determine violation severity
- `getInspectionStats()` - Calculate inspection statistics

### 7. Testing the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/map` to see the map with MongoDB data
3. Check the browser console for any connection errors
4. Verify that inspection data is being displayed correctly

### 8. Troubleshooting

**Connection Issues:**
- Ensure MongoDB is running on `localhost:27017`
- Check that your `.env.local` file has the correct `MONGODB_URI`
- Verify the database and collection exist

**Data Not Loading:**
- Check the browser console for API errors
- Verify your inspection data structure matches the expected format
- Ensure the collection name is `inspections`

**Performance Issues:**
- Add indexes to your MongoDB collection for better query performance:
  ```javascript
  db.inspections.createIndex({ "Restaurant Name": 1 })
  db.inspections.createIndex({ "Inspection Date": -1 })
  db.inspections.createIndex({ Score: -1 })
  db.inspections.createIndex({ Grade: 1 })
  ```

### 9. Production Deployment

For production deployment:

1. Update your `MONGODB_URI` to point to your production MongoDB instance
2. Ensure your MongoDB instance is accessible from your deployment environment
3. Set up proper authentication and security measures
4. Consider using MongoDB Atlas for managed MongoDB hosting

## Data Migration

If you have existing data in a different format, you can create a migration script:

```javascript
// migration.js
const { MongoClient } = require('mongodb');

async function migrateData() {
  const client = new MongoClient('mongodb://localhost:27017/');
  
  try {
    await client.connect();
    const db = client.db('dine-safe');
    const collection = db.collection('inspections');
    
    // Your migration logic here
    // Transform and insert your data
    
  } finally {
    await client.close();
  }
}

migrateData();
```

This setup will allow you to fetch inspection data directly from your MongoDB database instead of relying on external APIs. 