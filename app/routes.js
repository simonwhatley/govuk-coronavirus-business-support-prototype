'use strict'

const express = require('express');
const router = express.Router();

const Questions = require('./models/questions');
const Schemes = require('./models/schemes');
const Outcomes = require('./models/outcomes');

// function checkHasAnswers(req, res, next) {
//   if (req.session.data.answers === undefined) {
//     res.redirect(req.baseUrl + '/');
//   } else {
//     next();
//   }
// }

// --------------------------------------------------
// Start
// --------------------------------------------------

router.get('/', (req, res) => {
  delete req.session.data;  
  res.render('index', {
    actions: {
      start: req.baseUrl + '/business-location'
    }
  });
});

// --------------------------------------------------
// Q: Where is your business based?
// --------------------------------------------------
router.get('/business-location', (req, res) => {
  
  if (req.session.data.answers === undefined) {
    req.session.data.answers = {};
  }
  
  res.render('question', {
    question: Questions.question('business-location', req.session.data.answers['business-location']),
    actions: {
      save: req.baseUrl + '/business-location',
      back: req.baseUrl + '/',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/business-location', (req, res) => {
  
  let errors = [];
  
  if (req.session.data.answers['business-location'] === undefined) {
    let error = {};
    error.fieldName = 'business-location';
    error.href = '#business-location';
    error.text = 'Choose a business location';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('business-location', req.session.data.answers['business-location']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/business-location',
        back: req.baseUrl + '/',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/business-size');
  }  
  
});

// --------------------------------------------------
// Q: What size was your business as of 28 February?
// --------------------------------------------------
router.get('/business-size', (req, res) => {
  res.render('question', {
    question: Questions.question('business-size', req.session.data.answers['business-size']),
    actions: {
      save: req.baseUrl + '/business-size',
      back: req.baseUrl + '/business-location',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/business-size', (req, res) => {
    
  let errors = [];
  
  if (req.session.data.answers['business-size'] === undefined) {
    let error = {};
    error.fieldName = 'business-size';
    error.href = '#business-size';
    error.text = 'Choose the size of your business';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('business-size', req.session.data.answers['business-size']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/business-size',
        back: req.baseUrl + '/business-location',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/annual-turnover');
  }  
  
});

// --------------------------------------------------
// Q: What is your turnover per year?
// --------------------------------------------------
router.get('/annual-turnover', (req, res) => {
  res.render('question', {
    question: Questions.question('annual-turnover', req.session.data.answers['annual-turnover']),
    actions: {
      save: req.baseUrl + '/annual-turnover',
      back: req.baseUrl + '/business-size',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/annual-turnover', (req, res) => {
    
  let errors = [];
  
  if (req.session.data.answers['annual-turnover'] === undefined) {
    let error = {};
    error.fieldName = 'annual-turnover';
    error.href = '#annual-turnover';
    error.text = 'Choose your turnover per year';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('annual-turnover', req.session.data.answers['annual-turnover']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/annual-turnover',
        back: req.baseUrl + '/business-size',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/paye-scheme');
  }  
  
});

// --------------------------------------------------
// Q: Are you an employer with a PAYE scheme?
// --------------------------------------------------
router.get('/paye-scheme', (req, res) => {
  res.render('question', {
    question: Questions.question('paye-scheme', req.session.data.answers['paye-scheme']),
    actions: {
      save: req.baseUrl + '/paye-scheme',
      back: req.baseUrl + '/annual-turnover',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/paye-scheme', (req, res) => {
    
  let errors = [];
  
  if (req.session.data.answers['paye-scheme'] === undefined) {
    let error = {};
    error.fieldName = 'paye-scheme';
    error.href = '#annual-turnover';
    error.text = 'Choose whether you are an employer with a PAYE scheme';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('paye-scheme', req.session.data.answers['paye-scheme']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/paye-scheme',
        back: req.baseUrl + '/annual-turnover',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/self-employed');
  }  
  
});

// --------------------------------------------------
// Q: Are you self-employed?
// --------------------------------------------------
router.get('/self-employed', (req, res) => {
  res.render('question', {
    question: Questions.question('self-employed', req.session.data.answers['self-employed']),
    actions: {
      save: req.baseUrl + '/self-employed',
      back: req.baseUrl + '/paye-scheme',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/self-employed', (req, res) => {
    
  let errors = [];
  
  if (req.session.data.answers['self-employed'] === undefined) {
    let error = {};
    error.fieldName = 'self-employed';
    error.href = '#self-employed';
    error.text = 'Choose whether you are self-employed';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('self-employed', req.session.data.answers['self-employed']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/self-employed',
        back: req.baseUrl + '/paye-scheme',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/non-domestic-property');
  }  
  
});

// --------------------------------------------------
// Q: Does your business have non-domestic property?
// --------------------------------------------------
router.get('/non-domestic-property', (req, res) => {
  res.render('question', {
    question: Questions.question('non-domestic-property', req.session.data.answers['non-domestic-property']),
    actions: {
      save: req.baseUrl + '/non-domestic-property',
      back: req.baseUrl + '/self-employed',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/non-domestic-property', (req, res) => {
    
  let errors = [];
  
  if (req.session.data.answers['non-domestic-property'] === undefined) {
    let error = {};
    error.fieldName = 'non-domestic-property';
    error.href = '#non-domestic-property';
    error.text = 'Choose whether your business has a property with a rateable value';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('non-domestic-property', req.session.data.answers['non-domestic-property']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/non-domestic-property',
        back: req.baseUrl + '/self-employed',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    
    if (req.session.data.answers['non-domestic-property'] == 'none') {
      res.redirect(req.baseUrl + '/business-sectors');
    } else {
      res.redirect(req.baseUrl + '/self-assessment-payment');
    }   
    
  }  
  
});

// --------------------------------------------------
// Q: Are you due to pay a self-assessment payment 
// on account by 31 July 2020?
// --------------------------------------------------
router.get('/self-assessment-payment', (req, res) => {
  res.render('question', {
    question: Questions.question('self-assessment-payment', req.session.data.answers['self-assessment-payment']),
    actions: {
      save: req.baseUrl + '/self-assessment-payment',
      back: req.baseUrl + '/non-domestic-property',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/self-assessment-payment', (req, res) => {
    
  let errors = [];
  
  if (req.session.data.answers['self-assessment-payment'] === undefined) {
    let error = {};
    error.fieldName = 'self-assessment-payment';
    error.href = '#self-assessment-payment';
    error.text = 'Choose whether you are able to pay a self-assessment payment on account by 31 July 2020';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('self-assessment-payment', req.session.data.answers['self-assessment-payment']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/self-assessment-payment',
        back: req.baseUrl + '/non-domestic-property',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/results');
  }  
  
});

// --------------------------------------------------
// Q: What sector is your business in?
// --------------------------------------------------
router.get('/business-sector', (req, res) => {
  res.render('question', {
    question: Questions.question('business-sector', req.session.data.answers['business-sector']),
    actions: {
      save: req.baseUrl + '/business-sector',
      back: req.baseUrl + '/non-domestic-property',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/business-sector', (req, res) => {
    
  let errors = [];
  
  // if (!req.session.data.answers['business-sector'].length) {
  if (req.session.data.answers['business-sector'] === undefined) {
    let error = {};
    error.fieldName = 'business-sector';
    error.href = '#business-sector';
    error.text = 'Choose a business sector';
    errors.push(error);
  }
  
  if (errors.length) {
    res.render('question', {
      question: Questions.question('business-sector', req.session.data.answers['business-sector']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/business-sector',
        back: req.baseUrl + '/non-domestic-property',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/rate-relief');
  }  
  
});

// --------------------------------------------------
// Q: Is your business in receipt of small business 
// rate relief or rural rate relief as of the 11 March 
// 2020?
// --------------------------------------------------
router.get('/rate-relief', (req, res) => {
  res.render('question', {
    question: Questions.question('rate-relief', req.session.data.answers['rate-relief']),
    actions: {
      save: req.baseUrl + '/',
      back: req.baseUrl + '/business-sector',
      start: req.baseUrl + '/business-location'
    }
  });
});

router.post('/rate-relief', (req, res) => {

  let errors = [];

  if (req.session.data.answers['rate-relief'] === undefined) {
    let error = {};
    error.fieldName = 'rate-relief';
    error.href = '#rate-relief';
    error.text = 'Choose whether your business is in receipt of small business rate relief or rural rate relief as of the 11 March 2020';
    errors.push(error);
  }

  if (errors.length) {
    res.render('question', {
      question: Questions.question('rate-relief', req.session.data.answers['rate-relief']),
      errors: errors,
      actions: {
        save: req.baseUrl + '/rate-relief',
        back: req.baseUrl + '/business-sector',
        start: req.baseUrl + '/business-location'
      }
    });
  } else {
    res.redirect(req.baseUrl + '/results');
  }  

});

// --------------------------------------------------
// results 
// --------------------------------------------------
router.get('/results', (req, res) => {
  
  let back = req.baseUrl + '/self-assessment-payment'
  if (req.session.data.answers['non-domestic-property'] == 'none') {
    back = req.baseUrl + '/rate-relief';
  }  
  
  res.render('results', {
    schemes: Schemes.find(),
    outcomes: Outcomes.find(req.session.data.answers),
    actions: {
      start: req.baseUrl + '/business-location',
      back: back
    }
  });
  
});

// --------------------------------------------------
// Add routes above this line
// --------------------------------------------------
module.exports = router;
