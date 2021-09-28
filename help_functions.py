
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
        
    



    


    
    

