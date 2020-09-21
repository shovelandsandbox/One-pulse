import {
    CoreConfig,
    metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const {
    AQHI_AIRQUALITYDATA,
    AQHI_GOODMORNING,
    AQHI_ABOUTYOU,
    AQHI_INTERESTS,
    AQHI_MEDICALAILMENTS,
    AQHI_GENDER,
    AQHI_FEMALE,
    AQHI_OTHERS,
    AQHI_AGEGROUP,
    AQHI_CHILED,
    AQHI_ELDERLY,
    AQHI_HOWACTIVE,
    AQHI_NOTVERY,
    AQHI_ACTIVE,
    AQHI_VERYACTIVE,
    AQHI_AREYOUPREGNANT,
    AQHI_YES,
    AQHI_NO,
    AQHI_MAYBE,
    AQHI_PREFERREDLOCATION,
    AQHI_HOME,
    AQHI_OFFICE,
    AQHI_SELECTPOLLUTANT,
    AQHI_AIRQUALITY,
    AQHI_POLLEN,
    AQHI_FIRES,
    AQHI_SELECTDURATION,
    AQHI_CURRENT,
    AQHI_HISTORICAL,
    AQHI_FORECAST,
    AQHI_LUNGDISEASE,
    AQHI_DONTKNOW,
    AQHI_HEARTDISEASE,
    AQHI_SKINDISEASE,
    AQHI_BOTH,
    AQHI_CONTINUE,
    AQHI_SKIN,
    AQHI_PNEUMONIA,
    AQHI_COUGHING,
    AQHI_INFLAMMATION,
    AQHI_HEADACHE,
    AQHI_SHORTTERMEFFECT,
    AQHI_CHILDREN,
    AQHI_PREGNANTWOMAN,
    AQHI_OUTDOORPEOPLE,
    AQHI_SENIORCITIZEN,
    AQHI_PEOPLEWITH,
    AQHI_CONTEXT3,
    AQHI_SAVELIVES,
    AQHI_CONTEXT2,
    AQHI_CONTROLALLERGY,
    AQHI_CONTEXT,
    AQHI_TAKECONTROL,
    AQHI_IMPACTONREPRODUCTIVE,
    AQHI_IMPACTONLIVER,
    AQHI_RESPIRATORY,
    AQHI_CARDIO,
    AQHI_HEADACHEANXIETY,
    AQHI_AFFECTNERVOUS,
    AQHI_LONGTERMEFFECT,
    AQHI_POLLUTION,
    AQHI_QUALITYINDEX,
    AQHI_ENTERLOCATION,
    AQHI_UNAVAILABLE,

    AQHI_AIRCOMPOSITION,
    AQHI_TIMEOUTERROR,
    AQHI_TIMEOUTERRORDESC,
    AQHI_CONNECTIVITYERRORDESC,
    AQHI_VALUEMODAL,
    AQHI_VALUEMODALHEADER,
    AQHI_LOADINGMODAL,
    AQHI_LOADINGMODALCONTENT,
    AQHI_FAILUREMODALCLOSE,
    AQHI_LOCATIONMODAL,
    AQHI_LOCATIONMODALDESC,
    AQHI_LOCATIONMODALSKIP,
    AQHI_LOCATIONMODALALLOW,
    AQHI_MALE,
    AQHI_ADULT,
    AQHI_CHILD,
    AQHI_MOREEFFECTED,
    AQHI_GOODAFTERNOON,
    AQHI_GOODEVENING,
    AQHI_HEALTHTIPS,
    AQHI_ASTHAMA,
    AQHI_HEART,
    AQHI_PREGNANT,
    AQHI_TABTEXT1,
    AQHI_TABTEXT2,
    AQHI_TABTEXT3,
    AQHI_TABTEXT4,
    AQHI_TABTEXT5,
    AQHI_SOURCE,
    AQHI_EFFECT,
    AQHI_SEELESS,
    AQHI_SEEMORE,
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
    value.label ? value.label : defaultValue;

const airQualityScreenMeta = () => {
    return {
        aqhiValue: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_VALUEMODAL),
            "[[\"Air Pollution Level\",\"Colour Code\",\"AQI\"],[\"Good\",\"#00e400\",\"0-50\"],[\"Moderate\",\"#ffff00\",\"51-100\"],[\"Unhealthy for Sensitive Groups\",\"#ff7e00\",\"101-150\"],[\"Unhealthy\",\"#fd0000\",\"151-200\"],[\"Very Unhealthy\",\"#8f3e9a\",\"201-300\"],[\"Hazardous\",\"#7e0023\",\"300+\"]]"
        ),
        aqhiModalHeader: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_VALUEMODALHEADER),
            "AQI Range"
        ),
        airComposition: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_AIRCOMPOSITION),
            "Air Composition"
        ),
        modalClose: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_FAILUREMODALCLOSE),
            "Close"
        ),
        notAvailabel: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_UNAVAILABLE),
            "We are currently unavailable in this location."
        ),
        weAreSorry: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TIMEOUTERROR),
            "We are sorry"
        ),
        skipText: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_LOCATIONMODALSKIP),
            "Skip"
        ),
        allowAccess: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_LOCATIONMODALALLOW),
            "Allow Access"
        ),
        enterLocation: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_ENTERLOCATION),
            "Enter the location"
        ),
        requiredLocation: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_LOCATIONMODAL),
            "Location Access Required"
        ),
        requiredDesc: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_LOCATIONMODALDESC),
            "Pulse requires access to your location in for the air quality index feature."
        ),
        airQualityIndex: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_QUALITYINDEX),
            "Air Quality Index"
        ),
        PollutionLeaves: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_POLLUTION),
            "Pollution Leaves No One Unefffected"
        ),
        longTerm: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_LONGTERMEFFECT),
            "Long-Term Effects"
        ),
        redChestEffects: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_AFFECTNERVOUS),
            "Affects Central Nervous System"
        ),
        redChestEffects2: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HEADACHEANXIETY),
            "(Headache, Anxiety)"
        ),
        redHeart: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CARDIO),
            "Cardio Vascular Diseases"
        ),
        redRespiratory: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_RESPIRATORY),
            "Respiratory Diseases (Asthma, Cancer)"
        ),
        redLiver: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_IMPACTONLIVER),
            "Impacts on Liver, Spleen, Blood"
        ),
        redReproductive: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_IMPACTONREPRODUCTIVE),
            "Impacts on Reproductive System"
        ),
        heading1: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TAKECONTROL),
            "Take Control of the Air You Breathe"
        ),
        context1: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CONTEXT),
            "Highly-accurate air quality information means we can all make healthier choices to protect ourselves and loved ones and reduce thier exposure to polluted air. It could be as simple as closing the windows, taking and alternative route to work."
        ),
        heading2: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CONTROLALLERGY),
            "Take Control of Your Allergies"
        ),
        context2: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CONTEXT2),
            "People with pollen sensitives are sensitive not only to different types of pollen, but the pollen grains themselves, even of the same species, can differ geographically as well as throughout a given season, with more or less of the allergenic components that irritate people's airways and immune system"
        ),
        heading3: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SAVELIVES),
            "Save Lives"
        ),
        context3: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CONTEXT3),
            "At any given time, there are hundreds, if not thousands of active wildfires taking place around the world. What's more, fire-related pollution lingers even after fire has passed. You caan always be informed & plan ahead and stay safe"
        ),
        gender: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_PEOPLEWITH),
            "People with chronic Lung/Heart disease, Diabetes"
        ),
        old: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SENIORCITIZEN),
            "Senior Citizen"
        ),
        exercise: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_OUTDOORPEOPLE),
            "People who exercise outdoors"
        ),
        pregnantWoman: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_PREGNANTWOMAN),
            "Pregnant Woman"
        ),
        children: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CHILDREN),
            "Children"
        ),
        shortTerm: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SHORTTERMEFFECT),
            "Short-Term Effects"
        ),
        headache: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HEADACHE),
            "Headache"
        ),
        nose: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_INFLAMMATION),
            "Nose, Throat, Eyes Inflammation"
        ),
        blueRespiratory: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_COUGHING),
            "Coughing, Painful Breathing"
        ),
        blueChest: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_PNEUMONIA),
            "Pneumonia, Bronchitis"
        ),
        blueSkin: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SKIN),
            "Skin Irritation"
        ),

        // new meta 

        goodMorning: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_GOODMORNING),
            "Good Morning,"
        ),
        aboutYou: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_ABOUTYOU),
            "About You"
        ),
        interest: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_INTERESTS),
            "Interests"
        ),
        medicalAilments: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_MEDICALAILMENTS),
            "Medical Ailments"
        ),
        landingGender: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_GENDER),
            "Gender"
        ),
        male: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_MALE),
            "Male"
        ),
        female: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_FEMALE),
            "female"
        ),
        others: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_OTHERS),
            "others"
        ),
        ageGroup: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_AGEGROUP),
            "Age Group"
        ),
        child: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CHILD),
            "child"
        ),
        adult: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_ADULT),
            "adult"
        ),
        elderly: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_ELDERLY),
            "Elderly"
        ),
        howActive: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HOWACTIVE),
            "How Active are You?"
        ),
        lessActive: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_NOTVERY),
            "Less Active"
        ),
        active: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_ACTIVE),
            "Active"
        ),
        veryActive: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_VERYACTIVE),
            "very Active"
        ),
        areYouPregnant: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_AREYOUPREGNANT),
            "Are You Pregnant?"
        ),
        yes: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_YES),
            "Yes"
        ),
        no: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_NO),
            "No"
        ),
        maybe: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_MAYBE),
            "May Be"
        ),
        preferredLocation: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_PREFERREDLOCATION),
            "Preferred Location"
        ),
        home: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HOME),
            "Home"
        ),
        office: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_OFFICE),
            "Office"
        ),
        selectPollutant: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SELECTPOLLUTANT),
            "Select the Pollutants"
        ),
        airQuality: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_AIRQUALITY),
            "Air Quality"
        ),
        pollen: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_POLLEN),
            "Pollen"
        ),
        fires: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_FIRES),
            "Fires"
        ),
        selectTheDuration: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SELECTDURATION),
            "Select the Duration"
        ),
        current: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CURRENT),
            "Current"
        ),
        historical: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HISTORICAL),
            "Historical"
        ),
        forecast: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_FORECAST),
            "Forecast"
        ),
        lungDisease: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_LUNGDISEASE),
            "Do you have any Lung Disease?"
        ),
        dontKnow: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_DONTKNOW),
            "Don't Know"
        ),
        heartDisease: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HEARTDISEASE),
            "Do you have any Heart Disease?"
        ),
        skinDisease: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SKINDISEASE),
            "Do you have any Eye Inflammation or Skin Irritation?"
        ),
        both: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_BOTH),
            "Both"
        ),
        continue: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_CONTINUE),
            "Continue"
        ),

        moreEffected: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_MOREEFFECTED),
            "Who is MORE AFFECTED?"
        ),
        goodAfternoon: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_GOODAFTERNOON),
            "Good Afternoon,"
        ),
        goodEvening: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_GOODEVENING),
            "Good Evening,"
        ),
        healthTips: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HEALTHTIPS),
            "Health Tips"
        ),
        Asthama: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_ASTHAMA),
            "Asthama"
        ),
        Heart: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_HEART),
            "Heart"
        ),
        Pregnant: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_PREGNANT),
            "Pregnant"
        ),
        AQHITabText1: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TABTEXT1),
            "Reduce the intensity of your outdoor activities. It is recommended to limit the time you are near busy roads, construction sites, open fires and other sources of smoke. Staying indoors with an activated air filtration system would be best for your long term health."
        ),
        AQHITabText2: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TABTEXT2),
            "Reduce the intensity of your outdoor activities. Keep relevant medication(s) available and consult a doctor with any questions. It is recommended to limit the time you are near busy roads, open fires and other sources of smoke. In addition, consider reducing the time you spend near industrial emission stacks. Staying indoors with an activated air filtration system would be best for your long term health."
        ),
        AQHITabText3: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TABTEXT3),
            "Reduce the intensity of your outdoor activities. Keep relevant medication(s) available and consult a doctor with any questions. It is recommended to limit the time you are near busy roads, construction sites, open fires and other sources of smoke. In addition, consider reducing the time you spend near industrial emission stacks. Staying indoors with an activated air filtration system would be best for your long term health."
        ),
        AQHITabText4: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TABTEXT4),
            "Reduce the intensity of your outdoor activities. It is recommended to limit the time you are near busy roads, construction sites, open fires and other sources of smoke. In addition, consider reducing the time you spend near industrial emission stacks. Staying indoors with an activated air filtration system would be best for your long term health."
        ),
        AQHITabText5: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_TABTEXT5),
            "To keep you and your baby healthy, reduce the intensity of your outdoor activities. It is recommended to limit the time you are near busy roads, construction sites, open fires and other sources of smoke. Staying indoors with an activated air filtration system would be best for your long term health."
        ),
        Source: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SOURCE),
            "Source"),
        Effect: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_EFFECT),
            "Effect"),
        SeeLess: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SEELESS),
            "SeeLess"),
        SeeMore: fetchLabel(
            helpers.findElement(AQHI_AIRQUALITYDATA, AQHI_SEEMORE),
            "SeeMore"),



        // aqhiValue: "[[\"Air Pollution Level\",\"Colour Code\",\"AQI\"],[\"Good\",\"#00e400\",\"0-50\"],[\"Moderate\",\"#ffff00\",\"51-100\"],[\"Unhealthy for Sensitive Groups\",\"#ff7e00\",\"101-150\"],[\"Unhealthy\",\"#fd0000\",\"151-200\"],[\"Very Unhealthy\",\"#8f3e9a\",\"201-300\"],[\"Hazardous\",\"#7e0023\",\"300+\"]]",
        // aqhiModalHeader: "AQI Range",
        // airComposition: "Air Composition",
        // modalClose: "Close",
        // notAvailabel: "We are currently unavailable in this location.",
        // weAreSorry: "We are sorry",
        // skipText: "Skip",
        // allowAccess: "Allow Access",
        // enterLocation: "Enter the location",
        // requiredLocation: "Location Access Required",
        // requiredDesc: "Pulse requires access to your location in for the air quality index feature.",
        // // airQualityIndex: "Air Quality Index",
        // PollutionLeaves: "Pollution Leaves No One Unefffected",
        // longTerm: "Long-Term Effects",
        // redChestEffects: "Affects Central Nervous System",
        // redChestEffects2: "(Headache, Anxiety)",
        // redHeart: "Cardio Vascular Diseases",
        // redRespiratory: "Respiratory Diseases (Asthma, Cancer)",
        // redLiver: "Impacts on Liver, Spleen, Blood",
        // redReproductive: "Impacts on Reproductive System",
        // heading1: "Take Control of the Air You Breathe",
        // context1: "Highly-accurate air quality information means we can all make healthier choices to protect ourselves and loved ones and reduce thier exposure to polluted air. It could be as simple as closing the windows, taking and alternative route to work.",
        // heading2: "Take Control of Your Allergies",
        // context2: "People with pollen sensitives are sensitive not only to different types of pollen, but the pollen grains themselves, even of the same species, can differ geographically as well as throughout a given season, with more or less of the allergenic components that irritate people's airways and immune system",
        // heading3: "Save Lives",
        // context3: "At any given time, there are hundreds, if not thousands of active wildfires taking place around the world. What's more, fire-related pollution lingers even after fire has passed. You caan always be informed & plan ahead and stay safe",
        // gender: "People with chronic Lung/Heart disease, Diabetes",
        // old: "Senior Citizen",
        // exercise: "People who exercise outdoors",
        // pregnantWoman: "Pregnant Woman",
        // children: "Children",
        // shortTerm: "Short-Term Effects",
        // headache: "Headache",
        // nose: "Nose, Throat, Eyes Inflammation",
        // blueRespiratory: "Coughing, Painful Breathing",
        // blueChest: "Pneumonia, Bronchitis",
        // blueSkin: "Skin Irritation",

        // for new screens

        // goodMorning: "Good Morning",
        // aboutYou: "About You",
        // interest: "Interests",
        // medicalAilments: "Medical Ailments",
        // landingGender: "Gender",
        // male: "Male",
        // female: "Female",
        // others: "Others",
        // ageGroup: "Age Group",
        // child: "Child",
        // adult: "Adult",
        // elderly: "Elderly",
        // howActive: "How Active are You",
        // lessActive: "Less Active",
        // active: "Active",
        // veryActive: "Very Active",
        // areYouPregnant: "Are You Pregnant?",
        // yes: "Yes",
        // no: "No",
        // maybe: "May Be",
        // preferredLocation: "Preferred Location",
        // home: "Home",
        // office: "Office",
        // selectPollutant: "Select the Pollutants",
        // airQuality: "Air Quality",
        // pollen: "Pollen",
        // fires: "Fires",
        // selectTheDuration: "Select the Duration",
        // current: "Current",
        // historical: "Historical",
        // forecast: "Forecast",
        // lungDisease: "Do you have any Lung Disease?",
        // dontKnow: "Don't Know",
        // heartDisease: "Do you have any Heart Disease?",
        // skinDisease: "Do you have any Eye Inflammation or Skin Irritation?",
        // both: "Both",
        // continue: "Continue",





    };
};

export default {
    airQualityScreenMeta,
};
