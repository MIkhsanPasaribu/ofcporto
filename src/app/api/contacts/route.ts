import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Path to the JSON file that will store contacts
const dataFilePath = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize the contacts file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const contacts = JSON.parse(fileContents);
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Read existing contacts
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const contacts = JSON.parse(fileContents);
    
    // Create new contact
    const newContact = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      subject: body.subject || '',
      message: body.message,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    // Add to contacts array
    contacts.push(newContact);
    
    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(contacts, null, 2));
    
    return NextResponse.json({ success: true, contact: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 });
  }
}