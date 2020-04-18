exports.find = function(answers) {
  if (!answers)
    return null
    
  let outcomes = [];
  
  // --------------------------------------------------
  // job_retention_scheme
  // --------------------------------------------------
  
  if (answers['paye-scheme'] !== undefined) {
    
    if (answers['paye-scheme'] == 'yes') {
      outcomes.push('job_retention_scheme');
    }
    
  }  
  
  // --------------------------------------------------
  // vat_scheme
  // --------------------------------------------------
  
  if (answers['annual-turnover'] !== undefined) {
    
    if (answers['annual-turnover'] != 'under_85k') {
      outcomes.push('vat_scheme');
    }
    
  }  
  
  // --------------------------------------------------
  // self_assessment_payments
  // --------------------------------------------------
  
  if (answers['self-assessment-payment'] !== undefined) {
    
    if (answers['self-assessment-payment'] == 'yes') {
      outcomes.push('self_assessment_payments');
    }
    
  }  
  
  // --------------------------------------------------
  // statutory_sick_rebate
  // --------------------------------------------------
  
  if (answers['business-size'] !== undefined 
      && answers['self-assessment-payment'] !== undefined) {
        
    if (answers['business-size'] == '0_to_249' 
        && answers['self-assessment-payment'] == 'yes') {
      outcomes.push('statutory_sick_rebate');
    }
    
  }
  
  // --------------------------------------------------
  // self_employed_income_scheme
  // --------------------------------------------------
  
  if (answers['business-size'] !== undefined 
      && answers['self-employed'] !== undefined) {
        
    if (answers['business-size'] == '0_to_249' 
        && answers['self-employed'] == 'yes') {
      outcomes.push('self_employed_income_scheme');
    }
    
  }
  
  // --------------------------------------------------
  // retail_hospitality_leisure_business_rates
  // --------------------------------------------------
  
  if (answers['business-location'] !== undefined 
      && answers['non-domestic-property'] !== undefined
      && answers['business-sector'] !== undefined) {
  
    if (answers['business-location'] == 'england' 
        && answers['non-domestic-property'] != 'none'
        && answers['business-sector'].indexOf('retail_hospitality_or_leisure') !== -1) {
      outcomes.push('retail_hospitality_leisure_business_rates');
    }
        
  }
  
  
  // --------------------------------------------------
  // retail_hospitality_leisure_grant_funding
  // --------------------------------------------------
  
  if (answers['business-location'] !== undefined 
      && answers['non-domestic-property'] !== undefined
      && answers['business-sector'] !== undefined) {
  
    if (answers['business-location'] == 'england' 
        && answers['non-domestic-property'] == 'under_51k'
        && answers['business-sector'].indexOf('retail_hospitality_or_leisure') !== -1) {
      outcomes.push('retail_hospitality_leisure_grant_funding');
    }  
        
  }
  
  // --------------------------------------------------
  // nursery_support
  // --------------------------------------------------
  
  if (answers['business-location'] !== undefined 
      && answers['non-domestic-property'] !== undefined
      && answers['business-sector'] !== undefined) {
  
    if (answers['business-location'] == 'england' 
        && answers['non-domestic-property'] != 'none' 
        && answers['business-sector'].indexOf('nurseries') !== -1) {
      outcomes.push('nursery_support');
    }
        
  }  
  
  // --------------------------------------------------
  // small_business_grant_funding
  // --------------------------------------------------
  
  if (answers['business-location'] !== undefined 
      && answers['business-size'] !== undefined 
      && answers['non-domestic-property'] !== undefined
      && answers['rate-relief'] !== undefined) {
        
    if (answers['business-location'] == 'england' 
        && answers['business-size'] == '0_to_249' 
        && answers['non-domestic-property'] != 'none'
        && answers['rate-relief'] == 'yes') {
      outcomes.push('small_business_grant_funding');
    }
    
  }
  
  // --------------------------------------------------
  // business_loan_scheme
  // --------------------------------------------------
  
  if (answers['annual-turnover'] !== undefined) {
    
    if (answers['annual-turnover'] == 'under_85k' || answers['annual-turnover'] == '85k_to_45m') {
      outcomes.push('business_loan_scheme');
    }
      
  }
  
  // --------------------------------------------------
  // large_business_loan_scheme
  // --------------------------------------------------
  
  if (answers['annual-turnover'] !== undefined) {
    
    if (answers['annual-turnover'] == '45m_to_500m' || answers['annual-turnover'] == '500m_and_over') {
      outcomes.push('business_loan_scheme');
    }
    
  } 
  
  // --------------------------------------------------
  // time_to_pay_service
  // --------------------------------------------------
  
  outcomes.push('time_to_pay_service');
  
  
  return outcomes;
}