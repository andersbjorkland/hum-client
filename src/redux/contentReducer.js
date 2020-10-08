import {ANSWERING, INVALID, SWITCH_LANGUAGE, UNINVALIDATE, UPDATE_CONTENT, UPDATE_PAGE} from "./actions";

const translationSwedish = {
    home: 'Hem',
    library: 'Arkiv',
    about: 'Om',
    contact: 'Kontakt',
    yes: 'Ja',
    no: 'Nej',
    abstain: 'Avstår',
    absent: 'Frånvarande',
    source: 'Källa',
    policySubheading: 'Riksdagens omröstning',
    institutionSubheading: 'Institution i fokus',
    humSubheading: 'Hum för dagen',
    answersHeading: `Du har svarat på [] fråga`,
    answersContent: "Vill du dela dina svar med oss? När det är dags för nästa Hum så presenterar vi resultaten. Om du inte vill dela dina svar med oss så behöver du helt enkelt inte göra någonting.",
    answersButton: "Låter intressant. Dela svaren!",
    invalidInput: "Fel värde",
    answersSent: "Dina svar har skickats!",
    sending: "Skickar...",
    prosCons: "För och emot",
    news: {
        header: "Nyheter"
    },
    election: {
        header: "Valkalender",
        subtitle: "När är nästa nationella val?",
        imgAlt: {
            EU: "EU:s flagga",
            SE: "Sveriges flagga"
        }
    },
    month: {
        jan: "januari",
        feb: "februari",
        mar: "mars",
        apr: "april",
        may: "may",
        jun: "juni",
        jul: "juli",
        aug: "augusti",
        sep: "september",
        oct: "oktober",
        nov: "november",
        dev: "december"
    }

};

const translationEnglish = {
    home: 'Home',
    library: 'Library',
    about: 'About',
    contact: 'Contact',
    yes: 'Yes',
    no: 'No',
    abstain: 'Abstain',
    absent: 'Absent',
    source: 'Source',
    policySubheading: 'Parliamentary Vote',
    institutionSubheading: 'Institution in focus',
    humSubheading: 'Hum of the day',
    answersHeading: `You've answered [] question`,
    answersContent: "Would you like to submit these answers to us? By the release of the next Hum we will also share how people generally has answered. You don't have to do anything if you don't want to share them.",
    answersButton: "I'm intrigued, share them!",
    invalidInput: "Invalid input",
    answersSent: "Successfully sent your answers!",
    sending: "Sending...",
    prosCons: "Pros and cons",
    news: {
        header: "News"
    },
    election: {
        header: "Election Calendar",
        subtitle: "When is our next nation wide election?",
        imgAlt: {
            EU: "EU's flag",
            SE: "Sweden's flag"
        }
    },
    month: {
        jan: "January",
        feb: "February",
        mar: "March",
        apr: "April",
        may: "May",
        jun: "June",
        jul: "July",
        aug: "August",
        sep: "September",
        oct: "October",
        nov: "November",
        dev: "December"
    }

}

const initialState = {
    page: "/",
    imageFolder: "/uploads/images/",
    language: "english",
    translation: {...translationEnglish},
    humId: '',
    questions: [],
    invalidInput: [],
    numOfAnswers: 0,
    theme: {
        header: "",
        content: "",
        symbol: {
            src: "",
            alt: ""
        },
    },
    institution: {
        header: "",
        content: ""
    },
    arguments: [],
    vote: {
        yes: 0,
        no: 0,
        abstain: 0,
        absent: 0
    },
    policy: {
        title: "",
        content: "",
        source: ""
    },
    raw: [],
    rawPolicy: {}
};

function contentReducer(state = initialState, action) {
    let questions;
    let numOfAnswers;
    let currentQuestion;
    let invalids
    switch (action.type) {
        case ANSWERING:
            numOfAnswers = state.numOfAnswers;
            questions = [...state.questions]
            questions = questions.map(question => {
                if (question.id === action.payload.data.questionId) {
                    currentQuestion = question;
                    if (!currentQuestion.answerOptions.isClicked) {
                        numOfAnswers++;
                    }
                    return Object.assign({}, question, {
                        answerOptions: Object.assign({}, question.answerOptions, {
                            isClicked: true
                        }),
                        answer: action.payload.data.value
                    });
                }
                return ({...question});
            });


            return Object.assign({}, state, {
                questions: [...questions],
                numOfAnswers: numOfAnswers
            })
        case INVALID:
            invalids = [...state.invalidInput];
            invalids.push(action.payload.componentId);
            return Object.assign({}, state, {
                invalidInput: invalids
            });
        case UNINVALIDATE:
            invalids = [...state.invalidInput];
            invalids = invalids.filter(idOfInvalid => idOfInvalid !== action.payload.componentId);
            return Object.assign({}, state, {
                invalidInput: invalids
            });
        case UPDATE_CONTENT:
            let updateData = {...action.payload.data};
            let humData = updateData['hydra:member'][0];
            console.log(humData);
            let entities = flattenArguments([], humData.policy.argument);

            return Object.assign({}, state, {
                humId: humData['@id'],
                questions: transformQuestions(state.language, humData.questions),
                policy: transformPolicy(humData.policy),
                vote: transformVote(humData.policy.vote),
                institution: transformInstitution(humData.institution),
                theme: transformTheme(humData.policy.policyTheme),
                arguments: entities,
                raw: humData
            });
        case SWITCH_LANGUAGE:
            let language = action.payload.language.toLowerCase();
            let translation = language === 'english' ? translationEnglish : translationSwedish;
            if (action.payload.isFetching) {
                return Object.assign({}, state, {
                    language: language,
                    translation: translation
                });
            }
            let policy = togglePolicyByLanguage(language, state);
            return Object.assign({}, state, {
                language: language,
                translation: translation,
                theme: toggleThemeByLanguage(language, state),
                questions: switchLanguageForQuestions(language, state),
                policy: policy,
                arguments: flattenArguments([], policy.argument),
                institution: toggleInstitutionByLanguage(language, state)
            });
        case UPDATE_PAGE:
            return Object.assign({}, state, {
                page: action.payload.page
            });
        default:
            return state;
    }
}

function flattenArguments(entities, rawParentArgument) {
      if (rawParentArgument.child) {

          return flattenArguments([...entities, transformArgument(rawParentArgument)], rawParentArgument.child)
      } else {
          entities.push(transformArgument(rawParentArgument))
          return entities;
      }
}

function transformArgument(rawArgument) {
    return {
        side: rawArgument.side,
        text: rawArgument.text,
    };
}

function switchLanguageForQuestions(language, state) {
    let rawQuestions = state.raw.questions;
    let questionsData = rawQuestions.filter(question => question.language.name.toLowerCase() === language.toLowerCase() );
    let transformedQuestions =  questionsData.map(question => transformQuestion(question));

    if (language !== "english") {
        transformedQuestions.forEach(question => {
            rawQuestions.forEach(raw => {
                raw.translations.forEach(translation => {
                    if (translation['@id'] === question.id) {
                        question.id = raw['@id'];
                    }
                });
            });
        });
        
    } 
    transformedQuestions.forEach(question => {
        state.questions.forEach(prior => {
            if (question.id === prior.id) {
                question.answer = prior.answer;
                question.answerOptions.isClicked = prior.answerOptions.isClicked;
            }
        });
    });

    return transformedQuestions;
}

function transformQuestions(language, questionsArray){
    let questionsData = questionsArray.filter(question => question.language.name.toLowerCase() === language.toLowerCase() );
    return questionsData.map(question => transformQuestion(question));
}

function transformTheme(theme) {
    return {
        header: theme.title,
        content: theme.text,
        symbol: {
            src: theme.symbol.fileName,
            alt: theme.symbol.alt,
        }
    }
}

function toggleInstitutionByLanguage(language, state) {
    let institutionRaw;
    if (language === 'english') {
        institutionRaw = state.raw.institution;
    } else {
        let institutionResults = state.raw.institution.translations.filter(tempInstitution => tempInstitution.language.name.toLowerCase() === language);
        institutionRaw = institutionResults.length > 0 ? institutionResults[0] : null;
    }

    return null === institutionRaw ? state.institution : transformInstitution(institutionRaw);
}

function toggleThemeByLanguage(language, state) {
    let policyThemeRaw;
    if (language === 'english') {
        policyThemeRaw = state.raw.policy.policyTheme;
    } else {
        let policyThemeResults = state.raw.policy.policyTheme.translations.filter(tempTheme => tempTheme.language.name.toLowerCase() === language);
        policyThemeRaw = policyThemeResults.length > 0 ? policyThemeResults[0] : null;
    }

    return null === policyThemeRaw ? state.theme : transformTheme(policyThemeRaw);
}

function togglePolicyByLanguage(language, state) {
    let policyRaw;
    if (language === 'english') {
        policyRaw = state.raw.policy;
    } else {
        let policyResults = state.raw.policy.policies.filter(tempPolicy => tempPolicy.language.name.toLowerCase() === language);
        policyRaw = policyResults.length > 0 ? policyResults[0] : null;
    }

    return null === policyRaw ? state.policy : transformPolicy(policyRaw);
}

function transformInstitution(institution) {
    return {
        header: institution.name,
        content: institution.text
    }
}

function transformPolicy(policy) {
    return {
        title: policy.title,
        content: policy.text,
        source: policy.source,
        argument: policy.argument
    }
}

function transformVote(vote) {
    return {
        yes: vote.yes,
        no: vote.no,
        abstain: vote.abstain,
        absent: vote.absent
    };
}

function transformQuestion(question) {
    let category = parseQuestionCategory(question);
    let values;
    switch (category) {
        case 'nominal':
            values = question['nominalAnswers'].map(answer => answer.value);
            break;
        case 'ordinal':
            if (question['ordinalAnswers'].length > 0) {
                values = [1, question['ordinalAnswers'][0]['scale']];
            } else {
                values = [1, 5];
            }
            break;
        case 'continuous':
            values = [question['continuousAnswers'][0]['minimum'], question['continuousAnswers'][0]['maximum']];
            break;
        default:
            values = ["0", "0"];
    }
    return {
        id: question['@id'],
        category: category,
        content: question['text'],
        answerOptions: {
            category: category,
            values: values,
            isClicked: false
        },
        answer: null
    }
}

function parseQuestionCategory(question) {
    let category;
    if (question['continuousAnswers'].length > 0) {
        category = 'continuous';
    } else if (question['ordinalAnswers'].length > 0) {
        category = 'ordinal';
    } else {
        category = 'nominal';
    }
    return category;
}

export default contentReducer;