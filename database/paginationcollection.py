import urllib3
from bs4 import BeautifulSoup

def PaginationCollection(url):
    http = urllib3.PoolManager()
    
    try:
        # Send GET request
        response = http.request('GET', url)
        
        # Check for successful response (status code 200)
        if response.status == 200:
            soup = BeautifulSoup(response.data, 'html.parser')
            
            # Extract all anchor tags in pagination
            pagination_links = []
            for a in soup.select('ul.pagination li a[href]'):
                link = a['href']
                
                # Filter out invalid links (like '#goto' or '#')
                if link not in ['#goto', '#', '']:
                    pagination_links.append(link)
            
            # Remove duplicates by converting to a set and back to a list
            pagination_links = list(set(pagination_links))
            
            # Transform the links to the desired format
            transformed_links = []
            for link in pagination_links:
                # Extract the numeric part from the link
                # Example link: https://www.indiabix.com/general-knowledge/basic-general-knowledge/005016
                parts = link.split('/')
                number_part = parts[-1]  # The last part (e.g., 005016)
                
                # Remove leading zeros and convert to integer
                transformed_number = int(number_part)  # Converts to int, removing leading zeros
                
                # Append the transformed number to the list
                transformed_links.append(transformed_number)
            
            # Create the transformed output
            base_url = url.split('/general-knowledge')[0] + '/general-knowledge/basic-general-knowledge/00'
            pagination_dict = {base_url: transformed_links}
            
            # Print the transformed dictionary
            # print(pagination_dict)
            links = []
            for key, value in pagination_dict.items():
                start, end = value
                for num in range(start, end+1):
                    # print(f"{key}{num}")
                    links.append(f'{key}{num}')
            return links
        
        else:
            print(f"Failed to retrieve the page. Status code: {response.status}")
    
    except Exception as e:
        print(f"An error occurred: {e}")

# Test the function with the provided URL
PaginationLinks = PaginationCollection('https://www.indiabix.com/general-knowledge/basic-general-knowledge/')