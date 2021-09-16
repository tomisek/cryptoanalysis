

# Functions for easier readability in the API  
# Might be moved in a later state 

def missingvalues_tool(data):

    ### Default value variables
    d_days = 365
    d_currency = 'usd'
    d_coin_market_period = 'max'
    
    ## check for missing values and correct them to default
    # and parse the string 'days' to integer
    
    if data['days'] == '':
        data['days'] = d_days
    else: 
        data['days'] = int(data['days'])
    
    if data['currency'] == '':
        data['currency'] = d_currency
    
    if data['market_period'] == '':
        data['market_period'] = d_coin_market_period

        
    return data
            

        

