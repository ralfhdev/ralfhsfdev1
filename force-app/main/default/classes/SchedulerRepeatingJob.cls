public with sharing class SchedulerRepeatingJob implements Schedulable {
    
    private final String JOB_NAME = 'Demo Job';
    private final Integer ONE_MINUTE = 1;

    public void execute (SchedulableContext cont) {
        findAndAbortJob(cont);
        //run the needed apex
    }

    private void findAndAbortJob (SchedulableContext cont) {
        if (cont != null) {
                List<CronJobDetail> foundJobs = [SELECT Id from CronJobDetail WHERE Name =: JOB_NAME LIMIT 1];

            if (!foundJobs.isEmpty()){
                List<CronTrigger> foundJobTriggers = [SELECT Id FROM CronTrigger WHERE CronJobDetailId =: foundJobs[0].Id LIMIT 1];

                if (!foundJobTriggers.isEmpty()) {
                    try {
                        System.abortJob(foundJobTriggers[0].Id);
                        rescheduleJob(); 
                    } catch (Exception e) {
                        //Put a errorhandler
                        system.debug('The job failed to abort :::' + JOB_NAME);
                    }
                }
            }
        } 
    }

    private void rescheduleJob() {
        DateTime oneMinuteAhead = System.now().addMinutes(ONE_MINUTE);
        String cronExpression = '' + oneMinuteAhead.second() + ' ' + oneMinuteAhead.minute() + ' ' + oneMinuteAhead.hour() + ' ' + oneMinuteAhead.day() + ' ' + oneMinuteAhead.month() + ' ' + oneMinuteAhead.year();
        System.schedule(JOB_NAME, cronExpression, new SchedulerRepeatingJob());
    }
}