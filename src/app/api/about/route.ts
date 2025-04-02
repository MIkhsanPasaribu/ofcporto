import { NextResponse } from 'next/server';
import { dataOperations } from '@/lib/data-utils';

export async function GET() {
  try {
    const about = await dataOperations.getAbout();
    return NextResponse.json(about);
  } catch (error) {
    console.error('Failed to fetch about information:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about information' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const about = await dataOperations.createAbout({
      title: body.title,
      description: body.description,
      image_url: body.imageUrl
    });
    
    return NextResponse.json(about, { status: 201 });
  } catch (error) {
    console.error('Failed to create about information:', error);
    return NextResponse.json(
      { error: 'Failed to create about information' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID is required' }, 
        { status: 400 }
      );
    }
    
    const about = await dataOperations.updateAbout(body.id, {
      title: body.title,
      description: body.description,
      image_url: body.imageUrl
    });
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Failed to update about information:', error);
    return NextResponse.json(
      { error: 'Failed to update about information' }, 
      { status: 500 }
    );
  }
}