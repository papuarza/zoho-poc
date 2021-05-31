
const CurrenciesOperations = require("zcrmsdk/core/com/zoho/crm/api/currencies/currencies_operations").CurrenciesOperations;
const ZCRMCurrency = require("zcrmsdk/core/com/zoho/crm/api/currencies/currency").Currency;
const Format = require("zcrmsdk/core/com/zoho/crm/api/currencies/format").Format;
const ResponseWrapper = require("zcrmsdk/core/com/zoho/crm/api/currencies/response_wrapper").ResponseWrapper;
const ActionWrapper = require("zcrmsdk/core/com/zoho/crm/api/currencies/action_wrapper").ActionWrapper;
const BaseCurrencyWrapper = require("zcrmsdk/core/com/zoho/crm/api/currencies/base_currency_wrapper").BaseCurrencyWrapper;
const BaseCurrencyActionWrapper = require("zcrmsdk/core/com/zoho/crm/api/currencies/base_currency_action_wrapper").BaseCurrencyActionWrapper;
const APIException = require("zcrmsdk/core/com/zoho/crm/api/currencies/api_exception").APIException;
const SuccessResponse = require("zcrmsdk/core/com/zoho/crm/api/currencies/success_response").SuccessResponse;
const BodyWrapper = require("zcrmsdk/core/com/zoho/crm/api/currencies/body_wrapper").BodyWrapper;
const Choice = require("zcrmsdk/utils/util/choice").Choice;

class Currency {
  static async getCurrencies() {
    let currenciesOperations = new CurrenciesOperations();
    let response = await currenciesOperations.getCurrencies();
    if (response != null) {

      console.log("Status Code: " + response.statusCode);

      if ([204, 304].includes(response.statusCode)) {
        console.log(response.statusCode == 204 ? "No Content" : "Not Modified");

        return;
      }


      let responseObject = response.object;

      if (responseObject != null) {

  
        if (responseObject instanceof ResponseWrapper) {

    
          let currencies = responseObject.getCurrencies();

          currencies.forEach(currency => {

      
            console.log("Currency Id: " + currency.getId());

      
            console.log("Currency IsoCode: " + currency.getIsoCode());

      
            console.log("Currency Symbol: " + currency.getSymbol());

      
            console.log("Currency CreatedTime: " + currency.getCreatedTime());

      
            console.log("Currency IsActive: " + currency.getIsActive().toString());

      
            console.log("Currency ExchangeRate: " + currency.getExchangeRate());

      
            let format = currency.getFormat();

            if (format != null) {

        
              console.log("Currency Format DecimalSeparator: " + format.getDecimalSeparator().getValue());

        
              console.log("Currency Format ThousandSeparator: " + format.getThousandSeparator().getValue());

        
              console.log("Currency Format DecimalPlaces: " + format.getDecimalPlaces().getValue());
            }

      
            let createdBy = currency.getCreatedBy();

      
            if (createdBy != null) {

        
              console.log("Currency CreatedBy User-Name: " + createdBy.getName());

        
              console.log("Currency CreatedBy User-ID: " + createdBy.getId());
            }

      
            console.log("Currency PrefixSymbol: " + currency.getPrefixSymbol().toString());

      
            console.log("Currency IsBase: " + currency.getIsBase().toString());

      
            console.log("Currency ModifiedTime: " + currency.getModifiedTime());

      
            console.log("Currency Name: " + currency.getName());

      
            let modifiedBy = currency.getModifiedBy();

      
            if (modifiedBy != null) {

        
              console.log("Currency ModifiedBy User-Name: " + modifiedBy.getName());

        
              console.log("Currency ModifiedBy User-ID: " + modifiedBy.getId());
            }
          });
        }
  
        else if (responseObject instanceof APIException) {

    
          console.log("Status: " + responseObject.getStatus().getValue());

    
          console.log("Code: " + responseObject.getCode().getValue());

          console.log("Details");

    
          let details = responseObject.getDetails();

          if (details != null) {
            Array.from(details.keys()).forEach(key => {
              console.log(key + ": " + details.get(key));
            });
          }

    
          console.log("Message: " + responseObject.getMessage().getValue());
        }
      }
    }
  }
}

module.exports = { Currency }