import urllib3
from bs4 import BeautifulSoup

def scrape_pages(base_urls):
    http = urllib3.PoolManager()
    response = http.request('GET', base_urls)
    if response.status == 200:
        soup = BeautifulSoup(response.data, 'html.parser')
        category_links = [a['href'] for a in soup.select('ul.need-ul-filter li a')]
        return category_links

url = 'https://www.indiabix.com/general-knowledge/questions-and-answers/'

Pages = scrape_pages(url)

