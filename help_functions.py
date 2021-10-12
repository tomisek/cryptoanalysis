import pandas as pd
# Functions for easier readability in the API  
# Might be moved in a later state 

def missingvalues_tool(data):


    ### Default value variables
    d_days = 365
    d_currency = 'usd'
    d_coin_market_period = 'max'
    
    ## check for missing values and correct them to default
    # and parse the string 'days' to integer if neccessary
    
    if data['days'] == '':
        data['days'] = d_days
    else: 
        data['days'] = int(data['days'])
    
    if data['currency'] == '':
        data['currency'] = d_currency
    
    if data['market_period'] == '':
        data['market_period'] = d_coin_market_period

        
    return data
            

def numeric_evaluations(data):
   # iterate over key and values in the data-dictionary
    for keys, values in data.copy().items():
        if isinstance(values, dict):
            data[keys] = numeric_evaluations(values)
        # check for values below zero
        elif isinstance(values, float) and values < 0:
            #pop the value and replace it with 0.1
            data.pop(keys)
            data[f"{keys}"] = 0.1
        # looking for instanse of values in dict, and check for value name    
        if isinstance(values, dict) and 'max_gain_procent' in values:
            # if the buy_price value has been replace from a negative value
            # then it will calcualate a new max gain percentage
            if values['buy_price'] == 0.1:    
                
                sell = values['sell_price']
                buy = values['buy_price']  

                change = sell - buy
                values['max_gain_procent'] = round(change / buy * 100) 
           
    return data
        
    
# checks if a history of a coin is older then 30 days from now.
def check_history(data, cryptos):
    
    #iterate through the coins
    for x in cryptos:

        #creates a variable for the time at this moment.
        now = pd.to_datetime('now')
        #adds adds a boolean to every coin, True or False.
        data[x]['output'] = data[x]['ds'].between(now - pd.Timedelta(30, 'd'), now)

    #checks if the coin has True value at index 0 , that means the coin has no history older than 30 days from now.
    #and is there by removed from the new dict.
    new_data = {k:v for k, v in data.items() if not v['output'][0]}
    #reversing the proccess to get a hold of the coin name of the one/ones that has to short history.  
    unwanted = {k:v for k, v in data.items() if v['output'][0]}
    #taking hold of all the keys in the "unwanted" dict , keys in this case are , coins
    keysList = list(unwanted.keys())
    #iterates through all the coins names , and removes the ones that matches with those in keysList.
    cryptos = [element for element in cryptos if element not in keysList]
    
        
    return new_data, cryptos
    



