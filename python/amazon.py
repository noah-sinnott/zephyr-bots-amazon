from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import random
import sys
import time

# ==================================================================================================================================

try: 
    chrome_options = Options()
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-setuid-sandbox")
    chrome_options.add_argument("--disable-features=site-per-process")
    chrome_options.add_argument("--disable-site-isolation-trials")
    chrome_options.add_argument("--window-size=1920x1080")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument("--disable-infobars")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--incognito")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(sys.argv[1])
    print("opened page")

except Exception as e: 
    print("Error occurred while opening page: ", e)
    time.sleep(50)
    driver.quit()
# ==================================================================================================================================

def shipping(): 
    try: 
        print("Entered shipping info")
    except Exception as e:
        print("Error occurred while entering shipping info: ", e)
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

        for char in sys.argv[4]:
            wait_time = random.uniform(0.07, 1)
            time.sleep(wait_time)
            email_input.send_keys(char)

        continue_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "continue"))
            )
        
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)
        continue_button.click()
        print("Entered email and pressed continue")

        password_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "ap_password"))
        )

        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        password_input.click()
        for char in sys.argv[5]:
            wait_time = random.uniform(0.07, 1)
            time.sleep(wait_time)
            password_input.send_keys(char)


        signin_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "signInSubmit"))
            )
        
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)
        signin_button.click()

        # ap-account-fixup-phone-skip-link
        try:
            
            phone_skip_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "ap-account-fixup-phone-skip-link"))
            )

            try: 
                wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
                time.sleep(wait_time)
                phone_skip_link.click()
                print("declined to enter phonenumber")
            except Exception as e:
                print("Error occurred while skipping phone number: ", e)

        except NoSuchElementException:
            pass

        print('signed in')
        if(sys.argv[6] != 'Shipping-page'):
            shipping()

    except Exception as e:
        print("Error occurred while signing in: ", e)
        driver.quit()

# ==================================================================================================================================

def addingtocart(): 
    try:
        elements = driver.find_elements(By.XPATH, '//*[@data-csa-c-content-id="offer_display_desktop_accordion_header"]')

        if len(elements) != 0:
            wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
            time.sleep(wait_time)
            elements[0].click()
            print("Clicked on one time purchase")


        buy_now_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "buy-now-button"))
            )
        
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)

        buy_now_button.click()
        print("Clicked on Buy Now button")
        if(sys.argv[6] != 'Signin-page'):
            signin()
    except Exception as e:
        print("Error occurred while adding to cart: ", e)
        driver.quit()

# ==================================================================================================================================

def checkforcookies():
    try:
        reject_all_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "sp-cc-rejectall-link"))
        )
        wait_time = random.uniform(float(sys.argv[2]), float(sys.argv[3]))
        time.sleep(wait_time)
        reject_all_button.click()
        print("Rejected all cookies")
        if(sys.argv[6] != 'Item-page'):
            addingtocart()
        
    except Exception as e:
        print("Error occurred while rejecting cookies: ", e)
        driver.quit()

# ==================================================================================================================================

checkforcookies()
