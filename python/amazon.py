from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import random
import sys
import time
import threading

# ==================================================================================================================================

path = sys.argv[0]

proxy = sys.argv[1]
visible = sys.argv[2]
maxPrice = sys.argv[3]
refreshRate = sys.argv[4]
wait1 = sys.argv[5]
wait2 = sys.argv[6]
typing1 = sys.argv[7]
typing2 = sys.argv[8]

url = sys.argv[9]

email = sys.argv[10]
password = sys.argv[11]

name = sys.argv[12]
number = sys.argv[13]
addressPostCode = sys.argv[14]
addressLine1 = sys.argv[15]
addressLine2 = sys.argv[16]
addressCity = sys.argv[17]
addressRegion = sys.argv[18]

billingPostCode = sys.argv[19]
billingLine1 = sys.argv[20]
billingLine2 = sys.argv[21]
billingCity = sys.argv[22]
billingRegion = sys.argv[23]

BillingCardNumber = sys.argv[24]
billingName = sys.argv[25]
billingExpirationDate = sys.argv[26]
billingCVC = sys.argv[27]
billingPhoneNumber = sys.argv[28]

print(url, proxy, visible, flush=True)
try: 
    chrome_options = Options()

    if(visible == 'false'): 
        chrome_options.add_argument("--headless")
    
    if(proxy != 'false'): 
        chrome_options.add_argument(f"--proxy-server={proxy}")

    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--start-maximized")
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
    driver.get(url)
    print("opened page", flush=True)

except Exception as e: 
    print("Error occurred while opening page: ", e, flush=True)
    driver.quit()

# ==================================================================================================================================

def wait_for_page_load(driver, timeout=30):
    WebDriverWait(driver, timeout).until(
        lambda d: d.execute_script('return document.readyState') == 'complete'
    )

# ==================================================================================================================================

def finishCheckout(): 
    wait_for_page_load(driver)
    try: 
        # add_new_address = WebDriverWait(driver, 10).until(
        #     EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="placeYourOrder1"]'))
        # )
        # add_new_address.click()    

        time.sleep(1000)

        if(visible == False):
            driver.quit() 

    except Exception as e:
        print("Error occurred while finalising checkout: ", e, flush=True)
        if(visible == False):
            driver.quit()

        
# ==================================================================================================================================

def payment(): 
    wait_for_page_load(driver)
    try: 
        add_card_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'apx-add-credit-card-action-test-id'))
        )
        add_card_button.click()    

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        iframe_locator = (By.CLASS_NAME, "apx-secure-iframe")
        WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it(iframe_locator))

        card_number_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="addCreditCardNumber"].pmts-account-Number'))
        )

        card_number_input.click()
        card_number_input.clear()

        for char in BillingCardNumber:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            card_number_input.send_keys(char)

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        card_number_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-accountHolderName"].apx-add-credit-card-account-holder-name-input'))
        )

        card_number_input.click()
        card_number_input.clear()

        for char in billingName:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            card_number_input.send_keys(char)

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        splitEXP = billingExpirationDate.split("/")

        select_element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.NAME, "ppw-expirationDate_month")))
        dropdown_month = Select(select_element)
        dropdown_month.select_by_value(str(int(splitEXP[0])))

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        select_element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.NAME, "ppw-expirationDate_year")))
        dropdown_year = Select(select_element)
        dropdown_year.select_by_value("20" + str(int(splitEXP[1])))

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)
        
        cvc_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="addCreditCardVerificationNumber"]'))
        )

        cvc_input.click()
        cvc_input.clear()

        for char in billingCVC:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            cvc_input.send_keys(char)

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        add_card_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-widgetEvent:AddCreditCardEvent"]'))
        )
        add_card_button.click()    

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        add_new_address = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-widgetEvent:ShowAddAddressEvent"]'))
        )
        add_new_address.click()    

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)


        name_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-fullName"]'))
        )
        name_input.click()
        name_input.clear()
        for char in billingName:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            name_input.send_keys(char)


        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        adressLine1_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-line1"]'))
        )

        adressLine1_input.click()
        adressLine1_input.clear()
        for char in billingLine1:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            adressLine1_input.send_keys(char)

        if(addressLine2 != False):
            wait_time = random.uniform(float(wait1), float(wait2))
            time.sleep(wait_time)

            adressLine2_input = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-line2"]'))
            )
            adressLine2_input.click()
            adressLine2_input.clear()
            for char in billingLine2:
                wait_time = random.uniform(float(typing1), float(typing2))
                time.sleep(wait_time)
                adressLine2_input.send_keys(char)


        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        city_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-city"]'))
        )
        city_input.click()
        city_input.clear()
        for char in billingCity:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            city_input.send_keys(char)
        
        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        county_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-stateOrRegion"]'))
        )
        county_input.click()
        county_input.clear()
        for char in billingRegion:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            county_input.send_keys(char)
        

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        postcode_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-postalCode"]'))
        )

        postcode_input.click()
        postcode_input.clear()
        for char in billingPostCode:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            postcode_input.send_keys(char)


        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        select_element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.NAME, "ppw-countryCode")))
        dropdown_country = Select(select_element)
        dropdown_country.select_by_value("GB")

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        number_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-phoneNumber"]'))
        )

        number_input.click()
        number_input.clear()
        for char in billingPhoneNumber:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            number_input.send_keys(char)
    

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        add_new_address = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-widgetEvent:AddAddressEvent"]'))
        )
        add_new_address.click()    

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        add_new_address = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-widgetEvent:SavePaymentMethodDetailsEvent"]'))
        )
        add_new_address.click()    

        driver.switch_to.default_content()

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        add_new_address = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[name="ppw-widgetEvent:SetPaymentPlanSelectContinueEvent"]'))
        )
        add_new_address.click()    

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        print("Entered Payment Info", flush=True)

        finishCheckout()

    except Exception as e:
        print("Error occurred while entering payment info: ", e, flush=True)
        if(visible == False):
            driver.quit()

        

# ==================================================================================================================================

def shipping(): 
    wait_for_page_load(driver)
    try: 
        if driver.find_elements(By.ID, "add-new-address-popover-link"):
            try:
                add_address_link = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.ID, "add-new-address-popover-link"))
                )
                wait_time = random.uniform(float(wait1), float(wait2))
                time.sleep(wait_time)
                add_address_link.click()
            except Exception as e:
                print("Error occurred while adding new address: ", e, flush=True)


        select_element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.NAME, "address-ui-widgets-countryCode")))
        dropdown_country = Select(select_element)
        dropdown_country.select_by_value("GB")

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        name_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressFullName"))
        )
        name_input.click()
        name_input.clear()
        for char in name:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            name_input.send_keys(char)

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        number_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressPhoneNumber"))
        )
        number_input.click()
        number_input.clear()
        for char in number:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            number_input.send_keys(char)


        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)



        postcode_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressPostalCode"))
        )
        postcode_input.click()
        postcode_input.clear()
        for char in addressPostCode:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            postcode_input.send_keys(char)


        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        adressLine1_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressLine1"))
        )
        adressLine1_input.click()
        adressLine1_input.clear()
        for char in addressLine1:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            adressLine1_input.send_keys(char)

        if(addressLine2 != False):
            wait_time = random.uniform(float(wait1), float(wait2))
            time.sleep(wait_time)

            adressLine2_input = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressLine2"))
            )
            adressLine2_input.click()
            adressLine2_input.clear()
            for char in addressLine2:
                wait_time = random.uniform(float(typing1), float(typing2))
                time.sleep(wait_time)
                adressLine2_input.send_keys(char)


        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        city_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressCity"))
        )
        city_input.click()
        city_input.clear()
        for char in addressCity:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            city_input.send_keys(char)

        if(addressRegion != False):
            wait_time = random.uniform(float(wait1), float(wait2))
            time.sleep(wait_time)

            county_input = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "address-ui-widgets-enterAddressDistrictOrCounty"))
            )
            county_input.click()
            county_input.clear()
            for char in addressRegion:
                wait_time = random.uniform(float(typing1), float(typing2))
                time.sleep(wait_time)
                county_input.send_keys(char)

        submit_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "address-ui-widgets-form-submit-button"))
            )
        submit_button.click()

        print("Entered shipping info", flush=True)

        payment()

    except Exception as e:
        print("Error occurred while entering shipping info: ", e, flush=True)
        if(visible == False):
            driver.quit()

# ==================================================================================================================================

def signin(): 
    wait_for_page_load(driver)
    try: 
        email_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "ap_email"))
        )

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)
        email_input.click()
        email_input.clear()
        for char in email:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            email_input.send_keys(char)

        continue_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "continue"))
            )
        
        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)
        continue_button.click()
        print("Entered email and pressed continue", flush=True)

        password_input = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "ap_password"))
        )

        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        password_input.click()
        password_input.clear()
        for char in password:
            wait_time = random.uniform(float(typing1), float(typing2))
            time.sleep(wait_time)
            password_input.send_keys(char)


        signin_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "signInSubmit"))
            )
        
        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)
        signin_button.click()

        if driver.find_elements(By.ID, "ap-account-fixup-phone-skip-link"):
            try:
                phone_skip_link = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.ID, "ap-account-fixup-phone-skip-link"))
                )
                wait_time = random.uniform(float(wait1), float(wait2))
                time.sleep(wait_time)
                phone_skip_link.click()
                print("declined to enter phonenumber", flush=True)
            except Exception as e:
                print("Error occurred while skipping phone number: ", e, flush=True)
                if(visible == False):
                    driver.quit()
                

        print('signed in', flush=True)
        
        shipping()

    except Exception as e:
        print("Error occurred while signing in: ", e, flush=True)
        if(visible == False):
            driver.quit()

# ==================================================================================================================================

def addingtocart(): 
    wait_for_page_load(driver)
    try:
        elements = driver.find_elements(By.XPATH, '//*[@data-csa-c-content-id="offer_display_desktop_accordion_header"]')

        if len(elements) != 0:
            wait_time = random.uniform(float(wait1), float(wait2))
            time.sleep(wait_time)
            elements[0].click()
            print("Clicked on one time purchase", flush=True)


        temp = False
        while not temp:
            buy_now_button = driver.find_elements(By.ID, 'buy-now-button')     
            if len(buy_now_button) > 0:
                temp = True
            else:
                time.sleep(float(refreshRate))
                driver.refresh()
                wait_for_page_load(driver)


        price_container = driver.find_element(By.ID, 'corePrice_feature_div')
        price_large = price_container.find_element(By.CLASS_NAME, 'a-price-whole')
        price_small = price_container.find_element(By.CLASS_NAME, 'a-price-fraction')
        item_price = float(price_large.text + "." + price_small.text)
        if(item_price > float(maxPrice)): 
            print("Price exceeds max price", flush=True)
            if(visible == False):
                driver.quit() 


        buy_now_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "buy-now-button"))
            )
        
        wait_time = random.uniform(float(wait1), float(wait2))
        time.sleep(wait_time)

        buy_now_button.click()
        print("Clicked on Buy Now button", flush=True)
        
        signin()

    except Exception as e:
        print("Error occurred while adding to cart: ", e, flush=True)
        if(visible == False):
            driver.quit()

# ==================================================================================================================================

def checkforcookies():
    try:
        wait_for_page_load(driver)
        if driver.find_elements(By.ID, "sp-cc-rejectall-link"):
            reject_all_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "sp-cc-rejectall-link"))
            )
            wait_time = random.uniform(float(wait1), float(wait2))
            time.sleep(wait_time)
            reject_all_button.click()
            print("Rejected all cookies", flush=True)

            addingtocart()
        
    except Exception as e:
        print("Error occurred while rejecting cookies: ", e, flush=True)
        if(visible == False):
            driver.quit()

        

# ==================================================================================================================================

def checkStatus():
    while True:
        line = sys.stdin.readline().strip()
        if line == 'End':
            driver.quit()
            
# ===================================================================================================================================

status_thread = threading.Thread(target=checkStatus)
cookies_thread = threading.Thread(target=checkforcookies)
status_thread.start()
cookies_thread.start()

status_thread.join()
cookies_thread.join()





