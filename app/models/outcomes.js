exports.find = function(answers) {
  if (!answers)
    return null
    
  let outcomes = [];
  
  // --------------------------------------------------
  // job_retention_scheme
  // --------------------------------------------------
  
  outcomes.push('job_retention_scheme');
  
  // --------------------------------------------------
  // vat_scheme
  // --------------------------------------------------
  
  if (answers['annual-turnover'] != 'under_85k') {
    outcomes.push('vat_scheme');
  }
  
  // --------------------------------------------------
  // self_assessment_payments
  // --------------------------------------------------
  
  if (answers['self-employed'] == 'yes' 
      && answers['self-assessment-payment'] == 'yes') {
    outcomes.push('self_assessment_payments');
  }
  
  // --------------------------------------------------
  // statutory_sick_rebate
  // --------------------------------------------------
  
  if (answers['business-size'] == 'small_medium_enterprise' 
      && answers['self-assessment-payment'] == 'yes') {
    outcomes.push('statutory_sick_rebate');
  }
  
  // --------------------------------------------------
  // self_employed_income_scheme
  // --------------------------------------------------
  
  if (answers['business-size'] == 'small_medium_enterprise') {
    outcomes.push('self_employed_income_scheme');
  }
  
  // --------------------------------------------------
  // retail_hospitality_leisure_business_rates
  // --------------------------------------------------
  
  if (answers['business-location'] == 'england' 
      && answers['non-domestic-property'] != 'none'
      && (answers['business-sector'].indexOf('retail') !== -1
      || answers['business-sector'].indexOf('hospitality') !== -1
      || answers['business-sector'].indexOf('leisure') !== -1)) {
    outcomes.push('retail_hospitality_leisure_business_rates');
  }
  
  // --------------------------------------------------
  // retail_hospitality_leisure_grant_funding
  // --------------------------------------------------
  
  if (answers['business-location'] == 'england' 
      && answers['non-domestic-property'] == 'over_51k'
      && (answers['business-sector'].indexOf('retail') !== -1
      || answers['business-sector'].indexOf('hospitality') !== -1
      || answers['business-sector'].indexOf('leisure') !== -1)) {
    outcomes.push('retail_hospitality_leisure_grant_funding');
  }  
  
  // --------------------------------------------------
  // nursery_support
  // --------------------------------------------------
    
  if (answers['business-location'] == 'england' 
      && answers['non-domestic-property'] != 'none' 
      && answers['business-sector'].indexOf('nurseries') !== -1) {
    outcomes.push('nursery_support');
  }  
  
  
  // --------------------------------------------------
  // small_business_grant_funding
  // --------------------------------------------------
  
  if (answers['business-location'] == 'england' 
      && answers['business-size'] == 'small_medium_enterprise' 
      && answers['non-domestic-property'] != 'over_51k') {
    outcomes.push('small_business_grant_funding');
  }  
  
  // --------------------------------------------------
  // business_loan_scheme
  // --------------------------------------------------
  
  if (answers['annual-turnover'] == 'under_85k' || answers['annual-turnover'] == 'over_85k') {
    outcomes.push('business_loan_scheme');
  }  
  
  // --------------------------------------------------
  // large_business_loan_scheme
  // --------------------------------------------------
  
  if (answers['annual-turnover'] == 'over_45m') {
    outcomes.push('business_loan_scheme');
  }  
  
  // --------------------------------------------------
  // time_to_pay_service
  // --------------------------------------------------
  
  outcomes.push('time_to_pay_service');
  
  
  return outcomes;
}