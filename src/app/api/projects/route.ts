/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { dataOperations } from '@/lib/data-utils';

export async function GET(request: Request) {
  // Get the URL and create a URL object to parse query parameters
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  // If ID is provided, return a single project
  if (id) {
    try {
      const project = await dataOperations.getProjectById(id);
      
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      
      return NextResponse.json(project);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
  }
  
  // Otherwise, return all projects
  try {
    const projects = await dataOperations.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const project = await dataOperations.createProject({
      title: body.title,
      description: body.description,
      image_url: body.imageUrl,
      demo_url: body.demoUrl,
      github_url: body.githubUrl,
      technologies: body.technologies || []
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const project = await dataOperations.updateProject(body.id, {
      title: body.title,
      description: body.description,
      image_url: body.imageUrl,
      demo_url: body.demoUrl,
      github_url: body.githubUrl,
      technologies: body.technologies || []
    });
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await dataOperations.deleteProject(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}