/**
 * Created by beenotung on 7/3/16.
 */
declare namespace ionic {
    namespace IonicDatePickerService {
        interface IDatePickerOption {
            callback:(val?:number)=>void;
            disabledDates?:Date[];
            from?:Date;
            to?:Date;
            inputDate?:Date;
            mondayFirst?:boolean;
            disableWeekdays?:number[];
            closeOnSelect?:boolean;
            templateType?:string; // 'popup' | 'Modal'
            setLabel?:string;
            closeLabel?:string
        }
    }
    interface IonicDatePickerService {
        openDatePicker(cakkbacoption:IonicDatePickerService.IDatePickerOption):void;
    }
}
