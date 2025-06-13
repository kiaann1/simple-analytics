import { NextResponse } from 'next/server';

// Mock Google Analytics properties
const mockProperties = [
	{
		propertyId: '123456789',
		name: 'KWMT Marketing Website',
		displayName: 'kwmt.dev',
		websiteUrl: 'https://kwmt.dev',
		createTime: '2023-01-15T10:30:00Z',
		updateTime: '2024-01-15T14:22:00Z',
	},
	{
		propertyId: '987654321',
		name: 'KWMT Marketing Blog',
		displayName: 'blog.kwmt.dev',
		websiteUrl: 'https://blog.kwmt.dev',
		createTime: '2023-03-20T09:15:00Z',
		updateTime: '2024-01-10T11:45:00Z',
	},
	{
		propertyId: '555666777',
		name: 'Client Demo Site',
		displayName: 'demo.kwmt.dev',
		websiteUrl: 'https://demo.kwmt.dev',
		createTime: '2023-06-10T16:20:00Z',
		updateTime: '2024-01-05T08:30:00Z',
	},
];

export async function GET() {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	return NextResponse.json(mockProperties);
}
