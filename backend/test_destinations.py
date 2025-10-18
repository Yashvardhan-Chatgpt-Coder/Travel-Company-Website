import asyncio
import json
from server import sample_destinations, in_memory_data

async def test_destinations():
    print("Testing destinations...")
    print(f"Sample destinations: {len(sample_destinations)}")
    print(f"In-memory destinations: {len(in_memory_data.get('destinations', []))}")
    
    # Print sample destinations
    for dest in sample_destinations:
        print(f"  - {dest['name']}, {dest['country']}")
    
    # Print in-memory destinations
    print("\nIn-memory destinations:")
    for dest in in_memory_data.get('destinations', []):
        print(f"  - {dest['name']}, {dest['country']}")

if __name__ == "__main__":
    asyncio.run(test_destinations())


