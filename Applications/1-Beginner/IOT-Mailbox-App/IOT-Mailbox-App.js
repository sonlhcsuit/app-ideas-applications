/**
 * Monitor the light levels inside an IOT enabled snail mailbox to detect
 * when the mailbox door has been opened and closed.
 * @class IOTMailbox
 */
class IOTMailbox {
    /**
     * Creates an instance of IOTMailbox.
     * @param {number} [signalInterval=500] Timer interval for checking mailbox status.
     * @param {function} signalCallback Function to invoke when the timer interval expires.
     * @memberof IOTMailbox
     */
    constructor(signalInterval = 500, signalCallback) {
        this.signalInterval = signalInterval;
        this.signalCallback = signalCallback;
        this.intervalID = null;
        this.lastLightLevel = 0;
    }

    /**
     * Start monitoring of the mailbox and invoke the caller specified callback
     * function when the interval expires.
     * @memberof IOTMailbox
     */
    startMonitoring = () => {
        logging(`Starting monitoring of mailbox...`);
        this.intervalID = window.setInterval(this.signalStateChange, this.signalInterval);
    }

    /**
     * Stop monitoring the mailbox status
     * @memberof IOTMailbox
     */
    stopMonitoring = () => {
        if (this.intervalID === null) return;
        window.clearInterval(this.intervalID);
        this.intervalID = null;
        logging(`Mailbox monitoring stopped...`);
    }

    /**
     * Pass the current light level inside the mailbox to the users callback
     * function. The positive light levels indicate the door is open while 
     * negative levels indicate it is closed. Depending on the sampling interval 
     * the mailbox door could be in any postion from fully closed to fully open. 
     * This means the light level varies from interval-to-interval.
     * @memberof IOTMailbox
     */
    signalStateChange = () => {
        let lightLevel = 0;
        if (Math.random().toFixed(2) > 0.85) {
            lightLevel = Math.random().toFixed(2)
        } else {
            lightLevel = Math.random().toFixed(2)*-1
        }
        logging(`Mailbox state changed - lightLevel: ${lightLevel}`);
        this.signalCallback(this.lastLightLevel,lightLevel);
        this.lastLightLevel = lightLevel;
    }
};
function logging(message, err) {
    if (!err) {
        document.getElementById('log').insertAdjacentHTML(`beforeend`, `<p>Log:${message}`)
    } else {
        document.getElementById('log').insertAdjacentHTML(`beforeend`, `<p><span style="color:red!important">Error</span>:${message}`)
    }
}
function notif(message, err) {
    if (!err) {
        document.getElementById('notif').insertAdjacentHTML(`beforeend`, `<p>Notification: ${message}`)
    } else {
        document.getElementById('nofif').insertAdjacentHTML(`beforeend`, `<p><span style="color:red!important">Error</span>:${message}`)
    }
}
function toBottom(){
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight
    document.getElementById("notif").scrollTop = document.getElementById("notif").scrollHeight
}
function init() {
    let mailbox = new IOTMailbox(500, (oldLightLevel,preLightLevel) => {
        console.log(oldLightLevel)
        toBottom()

        if(preLightLevel > 0.5 && oldLightLevel < 0){
            // fully open => have email
            notif(`You got an email!`)
        }
        // no email
    })
    document.getElementById("start").addEventListener("click", (e) => {
        e.target.disabled=true
        document.getElementById("stop").disabled = false
        mailbox.startMonitoring()
    })
    document.getElementById("stop").addEventListener("click", (e) => {
        e.target.disabled=true
        document.getElementById("start").disabled = false
        mailbox.stopMonitoring()
    })
    document.getElementById("reset").addEventListener("click", (e) => {
        document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight
    })
}
init()