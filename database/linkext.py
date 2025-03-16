import urllib3
from bs4 import BeautifulSoup

# URL of the main page
base_url = "https://www.indiabix.com/aptitude/questions-and-answers/"

# Initialize HTTP request
http = urllib3.PoolManager()
response = http.request('GET', base_url)

# Check if request was successful
if response.status == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.data, 'html.parser')

    # Extract all links from the category list
    category_links = [a['href'] for a in soup.select('ul.need-ul-filter li a')]

    # Print extracted links
    for link in category_links:
        print(link)

else:
    print(f"Failed to retrieve the page. Status code: {response.status}")
