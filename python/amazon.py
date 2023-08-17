from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select
import random
import sys
import time
import threading

# ==================================================================================================================================
print(sys.argv, flush=True)

try: 
    chrome_options = Options()
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    # chrome_options.add_argument("--headless") # Show header
    chrome_options.add_argument("--disable-setuid-sandbox")
    chrome_options.add_argument("--disable-features=site-per-process")
    chrome_options.add_argument("--disable-site-isolation-trials")
    chrome_options.add_argument("--window-size=1920x1080")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--disable-infobars")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--incognito")
    service = Service(ChromeDriverManager(version="114.0.5735.90").install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(sys.argv[1])
    print("opened page", flush=True)

except Exception as e: 
    print("Error occurred while opening page: ", e, flush=True)

# ==================================================================================================================================

def shipping(): 
    try: 
        country_button_container = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-countryCode"))
            )
        country_button = country_button_container.find_element(By.XPATH, ".//span[@data-action='a-dropdown-button']")
        country_button.click()    

        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        element = driver.find_element(By.CSS_SELECTOR, '.a-popover.a-dropdown.a-dropdown-common.a-declarative')
        child = element.find_element(By.XPATH, "//a[contains(text(), 'United Kingdom')]")
        child.click()

        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        name_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressFullName"))
        )
        name_input.click()
        name_input.clear()
        for char in sys.argv[8]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            name_input.send_keys(char)

        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        number_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressPhoneNumber"))
        )
        number_input.click()
        number_input.clear()
        for char in sys.argv[9]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            number_input.send_keys(char)


        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)



        postcode_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressPostalCode"))
        )
        postcode_input.click()
        postcode_input.clear()
        for char in sys.argv[10]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            postcode_input.send_keys(char)


        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        adressLine1_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressLine1"))
        )
        adressLine1_input.click()
        adressLine1_input.clear()
        for char in sys.argv[11]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            adressLine1_input.send_keys(char)

        if(sys.argv[12] != False):
            wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
            time.sleep(wait_time)

            adressLine2_input = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressLine2"))
            )
            adressLine2_input.click()
            adressLine2_input.clear()
            for char in sys.argv[12]:
                wait_time = random.uniform(0.07, 0.3)
                time.sleep(wait_time)
                adressLine2_input.send_keys(char)


        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        city_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressCity"))
        )
        city_input.click()
        city_input.clear()
        for char in sys.argv[13]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            city_input.send_keys(char)

        if(sys.argv[14] != False):
            wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
            time.sleep(wait_time)

            county_input = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressDistrictOrCounty"))
            )
            county_input.click()
            county_input.clear()
            for char in sys.argv[14]:
                wait_time = random.uniform(0.07, 0.3)
                time.sleep(wait_time)
                county_input.send_keys(char)


        # submit_button = WebDriverWait(driver, 10).until(
        #         EC.element_to_be_clickable((By.ID, "address-ui-widgets-form-submit-button"))
        #     )
        # submit_button.find_element_by_css_selector('input.a-button-input').click()

        time.sleep(100)
        print("Entered shipping info", flush=True)
    except Exception as e:
        print("Error occurred while entering shipping info: ", e, flush=True)
        driver.quit()

# ==================================================================================================================================

def signin(): 
    try: 

        email_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "ap_email"))
        )

        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)
        email_input.click()
        email_input.clear()
        for char in sys.argv[4]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            email_input.send_keys(char)

        continue_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "continue"))
            )
        
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)
        continue_button.click()
        print("Entered email and pressed continue", flush=True)

        password_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "ap_password"))
        )

        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        password_input.click()
        password_input.clear()
        for char in sys.argv[5]:
            wait_time = random.uniform(0.07, 0.3)
            time.sleep(wait_time)
            password_input.send_keys(char)


        signin_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "signInSubmit"))
            )
        
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)
        signin_button.click()

        if driver.find_elements(By.ID, "ap-account-fixup-phone-skip-link"):
            try:
                phone_skip_link = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.ID, "ap-account-fixup-phone-skip-link"))
                )
                wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
                time.sleep(wait_time)
                phone_skip_link.click()
                print("declined to enter phonenumber", flush=True)
            except Exception as e:
                print("Error occurred while skipping phone number: ", e, flush=True)

        print('signed in', flush=True)
        if(sys.argv[6] != 'Shipping-page'):
            shipping()

    except Exception as e:
        print("Error occurred while signing in: ", e, flush=True)
        driver.quit()

# ==================================================================================================================================

def addingtocart(): 
    try:
        elements = driver.find_elements(By.XPATH, '//*[@data-csa-c-content-id="offer_display_desktop_accordion_header"]')

        if len(elements) != 0:
            wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
            time.sleep(wait_time)
            elements[0].click()
            print("Clicked on one time purchase", flush=True)


        buy_now_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "buy-now-button"))
            )
        
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        buy_now_button.click()
        print("Clicked on Buy Now button", flush=True)
        if(sys.argv[6] != 'Signin-page'):
            signin()
    except Exception as e:
        print("Error occurred while adding to cart: ", e, flush=True)
        driver.quit()

# ==================================================================================================================================

def checkforcookies():
    try:
        if driver.find_elements(By.ID, "sp-cc-rejectall-link"):
            reject_all_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "sp-cc-rejectall-link"))
            )
            wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
            time.sleep(wait_time)
            reject_all_button.click()
            print("Rejected all cookies", flush=True)

        if(sys.argv[6] != 'Item-page'):
            addingtocart()
        
    except Exception as e:
        print("Error occurred while rejecting cookies: ", e, flush=True)
        driver.quit()

# ==================================================================================================================================

def checkStatus():
    while True:
        line = sys.stdin.readline().strip()
        if line == 'End':
            driver.quit()
            sys.exit()
            
# ===================================================================================================================================

status_thread = threading.Thread(target=checkStatus)
cookies_thread = threading.Thread(target=checkforcookies)
status_thread.start()
cookies_thread.start()

status_thread.join()
cookies_thread.join()





