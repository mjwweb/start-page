<!--<div id="background"></div>-->

<div class="wrapperMain">

    <div class="mobile-overlay">
        <p>Mobile site under development</p>
    </div>

    <div class="creditsWrap">
        <div class="creditsRow">
            <i class="fal fa-user"></i>
            <p class="creditsValue creditsPerson"></p>
        </div>
        <div class="creditsRow">
            <i class="fal fa-map-marker-alt"></i>
            <p class="creditsValue creditsLocation"></p>
        </div>
        <div class="creditsRow">
            <i class="fab fa-instagram"></i>
            <p class="creditsValue creditsInstagram"></p>
        </div>
    </div>

    <div class="bkgTint"></div>

    <div class="topWrap">
        <?php if (isset($_SESSION['s-uid'])) : ?>
        <button class="addTaskBtn">Add Task</button>
        <?php endif ; ?>
        <button class="settingsIcon"><i class="fal fa-cog"></i></button>
        <button class="starIcon"><i class="fal fa-star"></i></button>
        <button class="taskListBtn"><i class="far fa-list-ul"></i></button>
    </div>

    <div class="settingsForm">
        <div style="border-bottom: none;" class="settingsRowWrap srchEngineBtn"><span class="settingsRowText">Search
                Engine</span><i class="far fa-search settingsRowIcon"></i></div>

        <div style="border-bottom: none;" class="settingsRowTog photoFeedTog">
            <span class="settingsRowText">Photo feed</span>
            <i class="far fa-images settingsRowIcon"></i>
            <label class="switch">
                <input checked class="photoFeedSwitch" type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>
        <div class="settingsRowTog tasksTogRow">
            <span class="settingsRowText">Show Tasks</span>
            <i class="far fa-list-ul settingsRowIcon"></i>
            <label class="switch">
                <input checked class="showTasksTog" type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>

        <!--
        <div class="settingsRowWrap homepageBtn"><span class="settingsRowText">Set Homepage</span><i
                class="far fa-home-lg settingsRowIcon"></i></div>
        -->

        <div style="border-bottom: none; display: none;" class="settingsRowTog">
            <span class="settingsRowText">Autocomplete</span>
            <label class="switch">
                <input checked class="autocompleteTog" type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>

        <div style="display: none;" class="settingsRowTog tasksTogRow">
            <span class="settingsRowText">Dark Theme</span>
            <label class="switch">
                <input class="darkThemeTog" type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>
        <?php if (isset($_SESSION['s-uid'])) : ?>
        <div style="border-bottom: none;" class="settingsRowWrap logoutBtn">
            <span class="settingsRowText">Sign Out</span>
            <i class="far fa-sign-out settingsRowIcon"></i>
        </div>
        <?php endif ; ?>
    </div>

    <div class="srchEngineFormWrap">
        <div class="srchEngineForm">
            <div class="srchEngineRow" value="Google">
                <p>Google</p>
            </div>
            <div class="srchEngineRow" value="Bing">
                <p>Bing</p>
            </div>
            <div class="srchEngineRow" value="Yahoo">
                <p>Yahoo</p>
            </div>
            <div style="border-bottom: none;" class="srchEngineRow" value="ddGo">
                <p>DuckDuckGo</p>
            </div>
        </div>
    </div>

    <div class="setHomepageFormWrap">
        <div class="setHomepageForm">
            <div class="chromeInstructions">
                <img class="chromeLogo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Google_Chrome_logo_with_wordmark_%282015%29.svg/1280px-Google_Chrome_logo_with_wordmark_%282015%29.svg.png" />
                <p>1. Click on the Chrome menu icon <i class="chromeSettingsIcon far fa-ellipsis-v"></i> in the upper
                    right corner and select Settings.</p>
                <p>2. Navigate to <span> <i class="far fa-power-off"></i> On Startup</span> .</p>
                <p>3. Check Open a specific page or set of pages, and click <span>Add a new page</span> . Enter <span
                        style="background: transparent; letter-spacing: .3px;">www.simplestart.io</span> in the box.</p>
            </div>
            <div class="firefoxInstructions">
                <img class="chromeLogo"
                    src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef09471731cbb40b3d85aac_firefox_2019_logo.jpg" />
                <p>1. Click and drag the link below to the home icon located in the upper-left corner of your browser.
                </p>
                <a href="https://www.google.com">https://www.google.com</a>
                <p style="margin-top: 15px;">2. Click yes in the pop up box.</p>
            </div>
        </div>
    </div>

    <div class="starredTasksForm">
        <div class="starredTasksHdr">
            <h3>Starred Tasks</h3>
            <div class="srchStarredWrap">
                <i class="far fa-search"></i>
                <input placeholder="Search tasks" class="srchStarInpt" type="text" />
            </div>
        </div>
        <div class="starredTasksContent"></div>
    </div>

    <div class="clockWrap">
        <p></p>
    </div>

    <div class="addTaskForm">
        <div class="taskInputWrap">
            <input class="addTaskInpt specialInput" placeholder="Add title" />
            <div class="inputBorder"></div>
        </div>
        <div class="taskFrmTimeWrap">
            <i class="taskFrmClock far fa-clock"></i>
            <div class="dateInptWrap">

            </div>
            <div class="timeInptWrap">
                12:00 am
            </div>
            <div class="timeCheckbox checkedTime">
                <i class="fas fa-check"></i>
            </div>
            <div class="allDayLabel">
                <p>All Day</p>
            </div>
        </div>
        <div class="commentInptIcon">
            <div class="iconLineTaskForm"></div>
            <div class="iconLineTaskForm"></div>
            <div class="iconLineTaskForm shortIconLine"></div>
        </div>
        <div class="taskCommentInptWrap">
            <textarea placeholder="Add comment..." class="taskCommentInpt specialInput"></textarea>
            <div class="inputBorder"></div>
        </div>
        <div class="taskFrmBtnsWrap">
            <button class="deleteTaskBtn"><i class="fal fa-trash-alt"></i>Delete</button>
            <button class="cancelTaskBtn">Cancel</button>
            <button class="saveTaskBtn">Save</button>
        </div>
    </div>

    <div class="timePickFrm">
        <div value="00:00:01" class="timeOption selectedTime">12:00 am</div>
        <div value="00:15:00" class="timeOption">12:15 am</div>
        <div value="00:30:00" class="timeOption">12:30 am</div>
        <div value="00:45:00" class="timeOption">12:45 am</div>
        <div value="01:00:00" class="timeOption">1:00 am</div>
        <div value="01:15:00" class="timeOption">1:15 am</div>
        <div value="01:30:00" class="timeOption">1:30 am</div>
        <div value="01:45:00" class="timeOption">1:45 am</div>
        <div value="02:00:00" class="timeOption">2:00 am</div>
        <div value="02:15:00" class="timeOption">2:15 am</div>
        <div value="02:30:00" class="timeOption">2:30 am</div>
        <div value="02:45:00" class="timeOption">2:45 am</div>
        <div value="03:00:00" class="timeOption">3:00 am</div>
        <div value="03:15:00" class="timeOption">3:15 am</div>
        <div value="03:30:00" class="timeOption">3:30 am</div>
        <div value="03:45:00" class="timeOption">3:45 am</div>
        <div value="04:00:00" class="timeOption">4:00 am</div>
        <div value="04:15:00" class="timeOption">4:15 am</div>
        <div value="04:30:00" class="timeOption">4:30 am</div>
        <div value="04:45:00" class="timeOption">4:45 am</div>
        <div value="05:00:00" class="timeOption">5:00 am</div>
        <div value="05:15:00" class="timeOption">5:15 am</div>
        <div value="05:30:00" class="timeOption">5:30 am</div>
        <div value="05:45:00" class="timeOption">5:45 am</div>
        <div value="06:00:00" class="timeOption">6:00 am</div>
        <div value="06:15:00" class="timeOption">6:15 am</div>
        <div value="06:30:00" class="timeOption">6:30 am</div>
        <div value="06:45:00" class="timeOption">6:45 am</div>
        <div value="07:00:00" class="timeOption">7:00 am</div>
        <div value="07:15:00" class="timeOption">7:15 am</div>
        <div value="07:30:00" class="timeOption">7:30 am</div>
        <div value="07:45:00" class="timeOption">7:45 am</div>
        <div value="08:00:00" class="timeOption">8:00 am</div>
        <div value="08:15:00" class="timeOption">8:15 am</div>
        <div value="08:30:00" class="timeOption">8:30 am</div>
        <div value="08:45:00" class="timeOption">8:45 am</div>
        <div value="09:00:00" class="timeOption">9:00 am</div>
        <div value="09:15:00" class="timeOption">9:15 am</div>
        <div value="09:30:00" class="timeOption">9:30 am</div>
        <div value="09:45:00" class="timeOption">9:45 am</div>
        <div value="10:00:00" class="timeOption">10:00 am</div>
        <div value="10:15:00" class="timeOption">10:15 am</div>
        <div value="10:30:00" class="timeOption">10:30 am</div>
        <div value="10:45:00" class="timeOption">10:45 am</div>
        <div value="11:00:00" class="timeOption">11:00 am</div>
        <div value="11:15:00" class="timeOption">11:15 am</div>
        <div value="11:30:00" class="timeOption">11:30 am</div>
        <div value="11:45:00" class="timeOption">11:45 am</div>
        <div value="12:00:00" class="timeOption">12:00 pm</div>
        <div value="12:15:00" class="timeOption">12:15 pm</div>
        <div value="12:30:00" class="timeOption">12:30 pm</div>
        <div value="12:45:00" class="timeOption">12:45 pm</div>
        <div value="13:00:00" class="timeOption">1:00 pm</div>
        <div value="13:15:00" class="timeOption">1:15 pm</div>
        <div value="13:30:00" class="timeOption">1:30 pm</div>
        <div value="13:45:00" class="timeOption">1:45 pm</div>
        <div value="14:00:00" class="timeOption">2:00 pm</div>
        <div value="14:15:00" class="timeOption">2:15 pm</div>
        <div value="14:30:00" class="timeOption">2:30 pm</div>
        <div value="14:45:00" class="timeOption">2:45 pm</div>
        <div value="15:00:00" class="timeOption">3:00 pm</div>
        <div value="15:15:00" class="timeOption">3:15 pm</div>
        <div value="15:30:00" class="timeOption">3:30 pm</div>
        <div value="15:45:00" class="timeOption">3:45 pm</div>
        <div value="16:00:00" class="timeOption">4:00 pm</div>
        <div value="16:15:00" class="timeOption">4:15 pm</div>
        <div value="16:30:00" class="timeOption">4:30 pm</div>
        <div value="16:45:00" class="timeOption">4:45 pm</div>
        <div value="17:00:00" class="timeOption">5:00 pm</div>
        <div value="17:15:00" class="timeOption">5:15 pm</div>
        <div value="17:30:00" class="timeOption">5:30 pm</div>
        <div value="17:45:00" class="timeOption">5:45 pm</div>
        <div value="18:00:00" class="timeOption">6:00 pm</div>
        <div value="18:15:00" class="timeOption">6:15 pm</div>
        <div value="18:30:00" class="timeOption">6:30 pm</div>
        <div value="18:45:00" class="timeOption">6:45 pm</div>
        <div value="19:00:00" class="timeOption">7:00 pm</div>
        <div value="19:15:00" class="timeOption">7:15 pm</div>
        <div value="19:30:00" class="timeOption">7:30 pm</div>
        <div value="19:45:00" class="timeOption">7:45 pm</div>
        <div value="20:00:00" class="timeOption">8:00 pm</div>
        <div value="20:15:00" class="timeOption">8:15 pm</div>
        <div value="20:30:00" class="timeOption">8:30 pm</div>
        <div value="20:45:00" class="timeOption">8:45 pm</div>
        <div value="21:00:00" class="timeOption">9:00 pm</div>
        <div value="21:15:00" class="timeOption">9:15 pm</div>
        <div value="21:30:00" class="timeOption">9:30 pm</div>
        <div value="21:45:00" class="timeOption">9:45 pm</div>
        <div value="22:00:00" class="timeOption">10:00 pm</div>
        <div value="22:15:00" class="timeOption">10:15 pm</div>
        <div value="22:30:00" class="timeOption">10:30 pm</div>
        <div value="22:45:00" class="timeOption">10:45 pm</div>
        <div value="23:00:00" class="timeOption">11:00 pm</div>
        <div value="23:15:00" class="timeOption">11:15 pm</div>
        <div value="23:30:00" class="timeOption">11:30 pm</div>
        <div value="23:45:00" class="timeOption">11:45 pm</div>
    </div>

    <div class="taskListWrap">

    </div>

    <div class="taskEditForm">
        <button class="taskEditRow"><i class="far fa-edit"></i>Edit Title</button>
        <button class="taskEditRow"><i class="far fa-clock"></i>Set Time</button>
        <button class="taskEditRow"><i class="fad fa-comment"></i>Add Comment</button>
        <button class="taskEditRow deleteTaskBtn"><i class="fas fa-trash-alt"></i>Delete</button>
    </div>

    <div>

        <div class="srchBarContainer">

            <div class="srchBarWrap srchBarFocus">
                <div>
                    <img class="srchIcon" />
                    <input type="text" spellcheck="false" autocomplete="off" id="srchInpt" autofocus />
                    <?php if (isset($_SESSION['s-uid'])) : ?>
                    <div class="addQlBtn">+</div>
                    <?php endif ; ?>
                </div>
                <div class="srchBarBottom">
                    <div class="quickLinksWrap">
                        <!-- ajax content -->
                    </div>
                </div>
            </div>

        </div>

        <div class="mainTasksWrapper">

            <div class="mainHdrWrap">
                <div class="taskDayWrap">
                    <div id="minusDay" class="noselect">
                        <div>&#8249;</div>
                    </div>
                    <div class="dateWrap">
                        <h2 id="weekdayHdr"></h2>
                        <input id="taskDateHdr" format=""></input>
                    </div>
                    <div id="plusDay" class="noselect">
                        <div>&#8250;</div>
                    </div>
                </div>
            </div>

            <div class="tasksWrap">

            </div>

        </div>

    </div>

    <?php if (!isset($_SESSION['s-uid'])) : ?>
    <p class="siMsg">Sign In or Register to schedule tasks</p>

    <div class="loginForm">
        <p class="authFormHdr">Login</p>
        <div class="lsFormInpts">
            <input placeholder="Email" class="emailInptLogin specialInput authInput" type="email" />
            <div class="inputBorder"></div>
        </div>
        <div class="lsFormInpts">
            <input placeholder="Password" class="pwdInptLogin specialInput authInput" type="password" />
            <div class="inputBorder"></div>
        </div>
        <p id="loginErMsg"></p>
        <button class="loginSubmit">Sign In</button>
        <p class="loginTogMsg">Don't have an account?</p>
        <a class="registerTog">Create Account</a>
    </div>

    <div class="signupForm">
        <p class="authFormHdr">Sign Up</p>
        <div class="lsFormInpts">
            <input placeholder="Email" class="emailInptSignup specialInput authInput" type="email" />
            <div class="inputBorder"></div>
        </div>
        <div class="lsFormInpts">
            <input placeholder="Password" class="pwdInptSignup specialInput authInput" type="password" />
            <div class="inputBorder"></div>
        </div>
        <div class="lsFormInpts">
            <input placeholder="Verify password" class="pwdRptInptSignup specialInput authInput" type="password" />
            <div class="inputBorder"></div>
        </div>
        <p id="signupErMsg"></p>
        <button class="signupSubmit">Signup</button>
        <p class="signupTogMsg">Already have an account?</p>
        <a class="loginTog">Sign In</a>
    </div>

    <?php endif ; ?>


    <div class="qlFormWrap">
        <div class="qlForm">
            <p class="qlFrmHdr">Quick Link</p>
            <div class="qlFrmInptWrap">
                <input class="qlFrmTitle specialInput" placeholder="Link name" type="text" />
                <div class="inputBorder"></div>
            </div>
            <div class="qlFrmInptWrap">
                <input class="qlFrmUrl specialInput" placeholder="Url address" type="text" />
                <div class="inputBorder"></div>
            </div>
            <div class="qlBtnsWrap">
                <button class="cancelQl">Cancel</button>
                <button class="saveQl">Save</button>
            </div>
        </div>
    </div>

</div>

</body>

</html>

<script src="js/main.js"></script>
<script src="js/auth.js"></script>
<script src="js/searchbar/addQuickLinks.js"></script>
<script src="js/searchbar/focusSearchbar.js"></script>
<script src="js/searchbar/showQuickLinks.js"></script>
<script src="js/searchbar/submitSearch.js"></script>
<script src="js/searchbar/predictiveSearch.js"></script>
<script src="js/settings/changeSearchEngine.js"></script>
<script src="js/settings/photoFeedTog.js"></script>
<script src="js/settings/darkTheme.js"></script>
<script src="js/settings/toggleTasks.js"></script>
<script src="js/settings/homepageInstructions.js"></script>
<script src="js/tasks/addNewTasks.js"></script>
<script src="js/tasks/changeTaskDate.js"></script>
<script src="js/tasks/loadTasks.js"></script>
<script src="js/tasks/modifyTasks.js"></script>