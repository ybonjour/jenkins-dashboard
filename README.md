# jenkins-dashboard
A dashboard for Jenkins Pipelines


## Capabilities
Show a dahsboard for one or many Jenkins pipelines:
- Current state of the pipeline and time that the pipeline has been in that state.
- Visualization of last completed pipeline run.
- Visualization of currently running pipeline run.
- Changesets of last pipeline run (either completed or currently running).
- Configure which pipelines are shown thorugh URL.

## Limitations
This project is a playground for Web APIs. There is no focus on maintainability nor on stability.
Which means it **doesn't** have:
- Proper error handling
- Tests
- Performance optimizations
- Clean code
- ...

Use with caution.

## USAGE
You need docker to run jenkins-dashboard.

```
docker run -e "JENKINS_SERVER=<hostname of your jernkins server>" -p 80:80 -d --rm ybonjour/jenkins-dashboard
```

Open `http://localhost/#Kjenkins_job_path>` in your browser. For example:
`http://localhost/#job/myFancyPipeline/job/master/`.

If you want to show dashboards for multiple pipelines you can do this as follows:
`http://localhost/#<jenkins_job1_path>&<jenkins_job2_path>`.
