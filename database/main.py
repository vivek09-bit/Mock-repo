import os
import urllib3
import json
from bs4 import BeautifulSoup

# ------------------------ Function to Fetch Subtopics ------------------------
def scrape_subtopics(base_url):
    """Fetch all subtopic links from a given main category page."""
    http = urllib3.PoolManager()
    response = http.request('GET', base_url)

    if response.status == 200:
        soup = BeautifulSoup(response.data, 'html.parser')
        subtopic_links = [a['href'] for a in soup.select('ul.need-ul-filter li a')]
        subtopics = []

        for link in subtopic_links:
            if not link.startswith("http"):
                link = "https://www.indiabix.com" + link  # Convert to absolute URL
            subtopics.append(link)

        return subtopics
    return []

# ------------------------ Function to Fetch Pagination Links ------------------------
def scrape_pagination(url):
    """Fetch pagination links for a subtopic."""
    http = urllib3.PoolManager()
    response = http.request('GET', url)

    if response.status != 200:
        return [url]  # Return original URL if pagination fails

    soup = BeautifulSoup(response.data, 'html.parser')
    pagination_links = [url]  # Include the base page

    # Extract numeric pagination links
    for a in soup.select('ul.pagination li a[href]'):
        link = a['href']
        if link not in ['#goto', '#', '']:
            if not link.startswith("http"):
                link = "https://www.indiabix.com" + link
            pagination_links.append(link)

    return list(set(pagination_links))  # Remove duplicates

# ------------------------ Function to Scrape Questions ------------------------
def scrape_questions(url):
    """Scrape questions from a given URL."""
    http = urllib3.PoolManager()
    response = http.request('GET', url)

    if response.status != 200:
        return {'error': f'Failed to fetch data, status code: {response.status}'}

    soup = BeautifulSoup(response.data, 'html.parser')
    questions_data = []

    question_containers = soup.find_all('div', class_='bix-div-container')

    for container in question_containers:
        direction_text = None
        direction_container = container.find_previous_sibling('div', class_='direction-div')
        image_path = None

        if direction_container:
            direction_text = direction_container.get_text(strip=True)
            image_tag = direction_container.find('img')
            image_url = image_tag['src'] if image_tag else None
            image_path = download_image("https://www.indiabix.com" + image_url) if image_url else None

        question = container.find('div', class_='bix-td-qtxt')
        question_text = question.get_text(strip=True) if question else 'Question not found'

        options = {}
        options_container = container.find('div', class_='bix-tbl-options')

        if options_container:
            for option_div in options_container.find_all('div', class_='bix-opt-row'):
                option_label = option_div.find('span')
                option_value = option_div.find('div', class_='flex-wrap')

                if option_label and option_value:
                    option_letter = option_label.get('id', '').split('_')[-2].upper()
                    options[option_letter] = option_value.get_text(strip=True)

        correct_answer_div = container.find('input', {'id': lambda x: x and x.startswith('hdnAnswer_')})
        correct_answer = correct_answer_div.get('value', 'Answer not found') if correct_answer_div else 'Answer not found'

        answer_description_div = container.find('div', class_='bix-ans-description')
        answer_description = answer_description_div.get_text(strip=True) if answer_description_div else 'Description not found'

        questions_data.append({
            'direction': direction_text,
            'image_path': image_path,
            'question': question_text,
            'options': options,
            'correct_answer': correct_answer,
            'answer_description': answer_description
        })

    return questions_data

# ------------------------ Function to Download Images ------------------------
def download_image(image_url, save_folder="images"):
    """Download and save images locally."""
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)

    http = urllib3.PoolManager()
    response = http.request('GET', image_url, preload_content=False)

    if response.status != 200:
        return None

    image_name = image_url.split('/')[-1]
    image_path = os.path.join(save_folder, image_name)

    with open(image_path, 'wb') as image_file:
        for chunk in response.stream(1024):
            image_file.write(chunk)
    response.release_conn()

    return image_path

# ------------------------ Function to Format Filenames ------------------------
def format_filename(url):
    """Convert URL into a structured filename."""
    formatted_name = url.replace("https://www.indiabix.com/", "").rstrip("/")
    formatted_name = formatted_name.replace("/", "-")
    return formatted_name

# ------------------------ Function to Save Questions ------------------------
def save_questions(data, url):
    """Save the scraped data to a structured JSON file."""
    file_name = format_filename(url) + ".json"
    file_path = os.path.join("subsubject", file_name)

    if not os.path.exists("subsubject"):
        os.makedirs("subsubject")

    with open(file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

    print(f"Saved: {file_path}")

# ------------------------ Main Function ------------------------
def main(base_urls):
    """Main function to scrape topics, pages, and questions."""
    if not os.path.exists("subsubject"):
        os.makedirs("subsubject")

    for base_url in base_urls:
        print(f"Fetching subtopics from: {base_url}")
        subtopics = scrape_subtopics(base_url)

        for subtopic in subtopics:
            print(f"Fetching pagination for: {subtopic}")
            pages = scrape_pagination(subtopic)

            for page in pages:
                print(f"Scraping questions from: {page}")
                all_questions = scrape_questions(page)
                save_questions(all_questions, page)

# ------------------------ Run the Script ------------------------
urls = [
    "https://www.indiabix.com/data-interpretation/questions-and-answers/",
    "https://www.indiabix.com/verbal-ability/questions-and-answers/",
    "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
    "https://www.indiabix.com/verbal-reasoning/questions-and-answers/",
    "https://www.indiabix.com/non-verbal-reasoning/questions-and-answers/",
    "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
    "https://www.indiabix.com/general-knowledge/questions-and-answers/",
    "https://www.indiabix.com/database/questions-and-answers/",
    "https://www.indiabix.com/electronics/questions-and-answers/",
    "https://www.indiabix.com/digital-electronics/questions-and-answers/",
    "https://www.indiabix.com/networking/questions-and-answers/",
    "https://www.indiabix.com/technical/c/the-c-language-basics/",
    "https://www.indiabix.com/python-programming/questions-and-answers/",
    "https://www.indiabix.com/placement-papers/companies/",
    "https://www.indiabix.com/java-programming/questions-and-answers/",
    
]
urls = list(set(urls))
urls = [url for url in urls if url not in ["https://www.indiabix.com/data-interpretation/questions-and-answers/",
    "https://www.indiabix.com/verbal-ability/questions-and-answers/",
    "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
    "https://www.indiabix.com/verbal-reasoning/questions-and-answers/"]]

main(urls)
print("All questions saved successfully.")
