import moment from "moment";
import { ccaImages } from "./images"

export const assessDuration = (lastAssessDate, histMeta) => {
    const presentDate = moment(new Date())
    const latestTestDate = lastAssessDate
    const difference = latestTestDate !== "" ? moment.duration(presentDate.diff(latestTestDate)) : null

    const daysDiff = difference !== null ? Math.floor(difference.asDays()) : null
    const monthsDiff = difference !== null ? Math.floor(difference.asMonths()) : null
    const yearsDiff = difference !== null ? Math.floor(difference.asYears()) : null

    var duration = ""

    if (daysDiff !== null) {

        if (daysDiff <= 0) {
            if (presentDate.format("YYYY-MM-DD") === latestTestDate.format("YYYY-MM-DD")) {
                duration = `${histMeta.LastDone} ${histMeta.Today}`
            } else if (presentDate.format("YYYY-MM-DD") > latestTestDate.format("YYYY-MM-DD")) {
                duration = `${histMeta.LastDone} ${histMeta.yesterday}`
            }
        }

        if (daysDiff > 0 && daysDiff < 30) {
            if (daysDiff === 1) {
                duration = `${histMeta.LastDone} ${daysDiff} ${histMeta.day} ${histMeta.ago}`
            };
            if (daysDiff > 1) {
                duration = `${histMeta.LastDone} ${daysDiff} ${histMeta.days} ${histMeta.ago}`
            };
        }

        else if (daysDiff >= 30 && daysDiff < 365) {
            if (monthsDiff === 1) {
                duration = `${histMeta.LastDone} ${monthsDiff} ${histMeta.month} ${histMeta.ago}`
            };
            if (monthsDiff > 1) {
                duration = `${histMeta.LastDone} ${monthsDiff} ${histMeta.months} ${histMeta.ago}`
            };
        }

        else if (daysDiff >= 365) {
            if (yearsDiff === 1) {
                duration = `${histMeta.LastDone} ${yearsDiff} ${histMeta.year} ${histMeta.ago}`
            };
            if (yearsDiff > 1) {
                duration = `${histMeta.LastDone} ${yearsDiff} ${histMeta.Years} ${histMeta.ago}`
            };
        }
    };

    return duration;

}

export const renderHumanImage = (gender, physique) => {
    switch (gender) {
        case "MALE":
            switch (physique) {
                case "allergic":
                    return ccaImages.male_allergic;
                case "blood-asthenia":
                    return ccaImages.male_blood_asthenia;
                case "blood-stasis":
                    return ccaImages.male_blood_stasis;
                case "damp-heat":
                    return ccaImages.male_damp_heat;
                case "phlegm-dampness":
                    return ccaImages.male_phlegm_dampness;
                case "qi-asthenia":
                    return ccaImages.male_qi_asthenia;
                case "qi-stagnation":
                    return ccaImages.male_qi_stagna;
                case "yang-asthenia":
                    return ccaImages.male_yang_asthenia;
                case "yin-asthenia":
                    return ccaImages.male_yin_asthenia;
                case "yin-yang-harmony":
                    return ccaImages.male_yin_yang_harmony;

                case "allergic-m":
                    return ccaImages.male_allergic;
                case "blood-asthenia-m":
                    return ccaImages.male_blood_asthenia;
                case "blood-stasis-m":
                    return ccaImages.male_blood_stasis;
                case "damp-heat-m":
                    return ccaImages.male_damp_heat;
                case "phlegm-dampness-m":
                    return ccaImages.male_phlegm_dampness;
                case "qi-asthenia-m":
                    return ccaImages.male_qi_asthenia;
                case "qi-stagnation-m":
                    return ccaImages.male_qi_stagna;
                case "yang-asthenia-m":
                    return ccaImages.male_yang_asthenia;
                case "yin-asthenia-m":
                    return ccaImages.male_yin_asthenia;
                case "yin-yang-harmony-m":
                    return ccaImages.male_yin_yang_harmony;
            }
        case "FEMALE":
            switch (physique) {
                case "allergic":
                    return ccaImages.female_allergic;
                case "blood-asthenia":
                    return ccaImages.female_blood_asthenia;
                case "blood-stasis":
                    return ccaImages.female_blood_stasis;
                case "damp-heat":
                    return ccaImages.female_damp_heat;
                case "phlegm-dampness":
                    return ccaImages.female_phlegm_dampness;
                case "qi-asthenia":
                    return ccaImages.female_qi_asthenia;
                case "qi-stagnation":
                    return ccaImages.female_qi_stagna;
                case "yang-asthenia":
                    return ccaImages.female_yang_asthenia;
                case "yin-asthenia":
                    return ccaImages.female_yin_asthenia;
                case "yin-yang-harmony":
                    return ccaImages.female_yin_yang_harmony;

                case "allergic-f":
                    return ccaImages.female_allergic;
                case "blood-asthenia-f":
                    return ccaImages.female_blood_asthenia;
                case "blood-stasis-f":
                    return ccaImages.female_blood_stasis;
                case "damp-heat-f":
                    return ccaImages.female_damp_heat;
                case "phlegm-dampness-f":
                    return ccaImages.female_phlegm_dampness;
                case "qi-asthenia-f":
                    return ccaImages.female_qi_asthenia;
                case "qi-stagnation-f":
                    return ccaImages.female_qi_stagna;
                case "yang-asthenia-f":
                    return ccaImages.female_yang_asthenia;
                case "yin-asthenia-f":
                    return ccaImages.female_yin_asthenia;
                case "yin-yang-harmony-f":
                    return ccaImages.female_yin_yang_harmony;
            }
    }

}

export const switchDobLang = (dobEN, dobMeta) => {

    var day = dobEN.slice(0, 2);
    var month = dobEN.slice(3, 6);
    var year = dobEN.slice(7);

    var monthNum = "";

    switch (month) {
        case "Jan": monthNum = "01"; break;
        case "Feb": monthNum = "02"; break;
        case "Mar": monthNum = "03"; break;
        case "Apr": monthNum = "04"; break;
        case "May": monthNum = "05"; break;
        case "Jun": monthNum = "06"; break;
        case "Jul": monthNum = "07"; break;
        case "Aug": monthNum = "08"; break;
        case "Sep": monthNum = "09"; break;
        case "Oct": monthNum = "10"; break;
        case "Nov": monthNum = "11"; break;
        case "Dec": monthNum = "12"; break;
    }

    var dayCN = day.replace(day, `${day}${dobMeta.day}`);
    var monthCN = `${monthNum}${dobMeta.month}`
    var yearCN = year.replace(year, `${year}${dobMeta.year}`);

    var dobCN = `${yearCN} ${monthCN} ${dayCN}`
    return dobCN
}