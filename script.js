// ===================================================================
// START: LICENSE VERIFICATION CODE (Corrected Version)
// ===================================================================

const verifyUrl = "https://script.google.com/macros/s/AKfycby_tjAL3sH4ub1Hr4rikNlLBSgHbw2iQLbxGygXqx3-lzCAbxUCs4cHZ_lZmgMs0PbDMA/exec";

// Yeh function page load hote hi chalega, bina kisi conflict ke
document.addEventListener("DOMContentLoaded", function() {
  const savedKey = localStorage.getItem('website_license_key');
  if (savedKey) {
    verifyKeyOnLoad(savedKey);
  } else {
    document.getElementById('license-prompt').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
});

function verifyKeyOnLoad(key) {
  fetch(`${verifyUrl}?key=${key}`)
    .then(response => response.json())
    .then(data => {
      if (!data.valid) {
        localStorage.removeItem('website_license_key');
        document.getElementById('license-prompt').style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById('license-prompt').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
}

function checkLicense() {
  const messageEl = document.getElementById('license-message');
  const keyInput = document.getElementById('license-key-input').value;

  if (!keyInput) {
    messageEl.innerText = 'Please enter a key.';
    return;
  }
  messageEl.innerText = 'Verifying...';

  fetch(`${verifyUrl}?key=${keyInput}`)
    .then(response => response.json())
    .then(data => {
      if (data.valid) {
        localStorage.setItem('website_license_key', keyInput);
        document.getElementById('license-prompt').style.display = 'none';
        document.body.style.overflow = 'auto';
      } else {
        messageEl.innerText = 'Invalid or inactive license key.';
      }
    })
    .catch(error => {
      console.error("Error:", error);
      messageEl.innerText = 'Could not verify. Check internet connection.';
    });
}

// ===================================================================
// END: LICENSE VERIFICATION CODE
// ===================================================================


// ===================================================================
// START: YOUR ORIGINAL APPLICATION CODE (Aapka Purana Code Yahan Se Shuru)
// ===================================================================

// ============================================
// ===== CUSTOM ALERT KE LIYE NAYI FUNCTIONS =====
// ============================================
function showCustomAlert(message) {
    document.getElementById('custom-alert-message').textContent = message;
    document.getElementById('custom-alert-overlay').style.display = 'flex';
}
function hideCustomAlert() {
    document.getElementById('custom-alert-overlay').style.display = 'none';
}
function showCustomConfirm(message, onYes) {
    // Box ko dikhayein aur message set karein
    const confirmOverlay = document.getElementById('custom-confirm-overlay');
    document.getElementById('custom-confirm-message').textContent = message;
    confirmOverlay.style.display = 'flex';
    // Buttons ke click events set karein
    document.getElementById('custom-confirm-yes-btn').onclick = function () {
        confirmOverlay.style.display = 'none'; // Box chupayein
        onYes(); // Haan (Yes) wala kaam karein
    };
    document.getElementById('custom-confirm-no-btn').onclick = function () {
        confirmOverlay.style.display = 'none'; // Box chupayein
    };
}
const firebaseConfig = {
    apiKey: "AIzaSyB1kW_RUIm9IwCQHQ2Pse4y6O5Y-0ZgELw",
    authDomain: "service-app-93c44.firebaseapp.com",
    projectId: "service-app-93c44",
    storageBucket: "service-app-93c44.firebasestorage.app",
    messagingSenderId: "637840189336",
    appId: "1:637840189336:web:6e4f7050f2150523c3eded"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
// Page Elements
const authPages = document.getElementById('auth-pages');
const mainApp = document.getElementById('main-app');
const allPages = document.querySelectorAll('#main-app > div');
// State variables
let currentPlan = {};
let currentWithdrawMethod = '';
let currentUserData = {};
let depositListener = null;
let withdrawalListener = null;
// === NAYA VARIABLE URL SE REFERRER NIKALNE KE LIYE ===
const urlParams = new URLSearchParams(window.location.search);
const referrerUsername = urlParams.get('ref');
// Configs
const logos = {
    'Easypaisa': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqD8qdYOndcDdIGSKebW8F4KD8RqRQoK1CBPsuAMzN6g&s',
    'Jazzcash': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaTMT_-rMwUPSHjEWe34RZA_CdxfinWc5vW-_6FYNb7g&s',
    'Nayapay': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnbZ2xoAtwdtemT7V3PgvEVoPnj6I_0cqcobny0I_Ag&s',
    'Sadapay': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvlTB33hDfOVu7ShnOrseDZUl_XZgreBVv6LQ0THW2BA&s',
    'Upaisa': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZVYDar9rDYSfx5-IIeLQc0N07fT5fhiSdNHJzTJdfA&s'
};
const depositAccounts = {
    'Easypaisa': { name: 'Taufeeq Ahmed', number: '03262550724', bank: 'Easy Paisa' },
    'Jazzcash': { name: 'Taufeeq Ahmed', number: '03262550724', bank: 'Jazzcash' }
};
const planDetailsConfig = {
    'Plan-01': { dailyProfit: 18, duration: 65 },
    'Plan-02': { dailyProfit: 40, duration: 65 },
    'Plan-03': { dailyProfit: 97, duration: 65 },
    'Plan-04': { dailyProfit: 196, duration: 65 },
    'Plan-05': { dailyProfit: 405, duration: 65 },
    'Plan-06': { dailyProfit: 850, duration: 65 }, // <-- YEH NAYI LINE HAI
    'Plan-07': { dailyProfit: 1700, duration: 65 },
    'Plan-08': { dailyProfit: 3400, duration: 65 },
    'Plan-09': { dailyProfit: 4250, duration: 65 },
    'Plan-10': { dailyProfit: 5950, duration: 65 },
};
// --- AUTHENTICATION ---
auth.onAuthStateChanged(user => {
    if (user) {
        authPages.style.display = 'none';
        mainApp.style.display = 'block';
        loadAndListen(user);
    } else {
        authPages.style.display = 'block';
        mainApp.style.display = 'none';
        // ===== YAHAN NAYA FUNCTION CALL KAREIN =====
        resetAuthForms();
        if (depositListener) {
            depositListener.off();
        }
        if (withdrawalListener) {
            withdrawalListener.off();
            withdrawalListener = null;
        }
        if (earningHistoryListener) {
            earningHistoryListener.off();
            earningHistoryListener = null;
        }
    }
});
// === IS FUNCTION MEIN DASHBOARD COMMISSION UPDATE KARNE KA CODE ADD KIYA GAYA HAI ===
function loadAndListen(user) {
    database.ref('users/' + user.uid).on('value', snapshot => {
        if (snapshot.exists()) {
            currentUserData = snapshot.val();
            document.getElementById('dashboard-username').textContent = currentUserData.username;
            // ===== TABDEELI YAHAN HAI: Lambay numbers ko theek karne ke liye .toFixed(2) ka istemal =====
            document.getElementById('dashboard-balance').textContent = `PKR ${(currentUserData.balance || 0).toFixed(2)}`;
            document.getElementById('dashboard-total-profit').textContent = `PKR ${(currentUserData.totalProfit || 0).toFixed(2)}`;
            document.getElementById('dashboard-total-commission').textContent = `PKR ${(currentUserData.totalCommission || 0).toFixed(2)}`;
            // ===== TABDEELI KHATAM =====
            const referralLink = `${window.location.origin}${window.location.pathname}?ref=${currentUserData.username}`;
            document.getElementById('dashboard-referral-link-input').value = referralLink;
            document.getElementById('referral-link-input').value = referralLink;
        }
    });
    listenForUserDeposits(user.uid);
    listenForUserTasks(user.uid);
    listenForUserWithdrawals(user.uid);
    listenForUserEarnings(user.uid);
}
// === IS FUNCTION KO REFERRAL SYSTEM KE LIYE MUKAMMAL TOR PAR MODIFY KIYA GAYA HAI ===
function handleAuth(event, type) {
    event.preventDefault();
    const btn = event.target.querySelector('.auth-btn');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    if (type === 'signup') {
        const username = document.getElementById('signup-username').value.trim();
        const phone = document.getElementById('signup-phone').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        database.ref('users').orderByChild('username').equalTo(username).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    showCustomAlert("Username already exists. Please try another one.");
                    btn.disabled = false;
                    btn.textContent = 'Signup';
                    return;
                }
                const processSignup = (referrerUid = null) => {
                    auth.createUserWithEmailAndPassword(email, password)
                        .then(userCredential => {
                            const user = userCredential.user;
                            const newUserdata = {
                                username: username,
                                phone: phone,
                                email: email,
                                balance: 0,
                                totalProfit: 0,
                                totalCommission: 0,
                                createdAt: firebase.database.ServerValue.TIMESTAMP
                            };
                            if (referrerUid) {
                                newUserdata.referredBy = referrerUid;
                            }
                            const updates = {};
                            updates['/users/' + user.uid] = newUserdata;
                            if (referrerUid) {
                                // YEH HAI NAYA BADLAV: Hum 'true' ki jagah zaroori data save kar rahe hain
                                updates['/users/' + referrerUid + '/referrals/' + user.uid] = {
                                    username: username,
                                    joinDate: firebase.database.ServerValue.TIMESTAMP,
                                    totalDeposit: 0, // Shuru mein deposit 0 hoga
                                    totalBonus: 0 // Shuru mein bonus 0 hoga
                                };
                            }
                            return database.ref().update(updates);
                        })
                        .catch(error => {
                            showCustomAlert("Signup Error: " + error.message);
                        })
                        .finally(() => {
                            btn.disabled = false;
                            btn.textContent = 'Signup';
                        });
                };
                if (referrerUsername) {
                    database.ref('users').orderByChild('username').equalTo(referrerUsername).once('value')
                        .then(referrerSnapshot => {
                            let referrerUid = null;
                            if (referrerSnapshot.exists()) {
                                const referrerData = referrerSnapshot.val();
                                referrerUid = Object.keys(referrerData)[0];
                            }
                            processSignup(referrerUid);
                        })
                        .catch(error => {
                            showCustomAlert("Could not verify referrer: " + error.message);
                            processSignup(null);
                        });
                } else {
                    processSignup();
                }
            })
            .catch(error => {
                showCustomAlert("Database Error: " + error.message);
                btn.disabled = false;
                btn.textContent = 'Signup';
            });
    } else if (type === 'login') {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                showCustomAlert("Login Error: " + error.message);
            })
            .finally(() => {
                btn.disabled = false;
                btn.textContent = 'Login';
            });
    }
}
function handleLogout() {
    showCustomConfirm('Are you sure you want to logout?', function () {
        // Yeh code tab chalega jab user "Logout" button par click karega
        auth.signOut().catch(error => showCustomAlert(error.message));
    });
}
function resetAuthForms() {
    // Signup form ke fields ko khali karein
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-phone').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    // Login form ke fields ko khali karein
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    // Dono forms ke buttons ko reset karein
    const signupBtn = document.querySelector('#signup-page .auth-btn');
    if (signupBtn) {
        signupBtn.disabled = false;
        signupBtn.textContent = 'Signup';
    }
    const loginBtn = document.querySelector('#login-page .auth-btn');
    if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Login';
    }
}
// --- PAGE NAVIGATION ---
function hideAllPages() {
    allPages.forEach(page => page.style.display = 'none');
}
function showPage(pageId) {
    hideAllPages();
    document.getElementById(pageId).style.display = 'block';
}
function showDashboardPage() { showPage('dashboard-page'); }
function showPaymentPage() { showPage('payment-page'); }
function showPackagesPage() { showPage('packages-page'); }
function showActiveDepositsPage() { showPage('active-deposits-page'); }
function showTaskPage() { showPage('task-page'); }
// === YEH REFERRALS PAGE KO DIKHANE AUR DATA LOAD KARNE KE LIYE HAI ===
function showReferralsPage() {
    showPage('referrals-page');
    const user = auth.currentUser;
    if (user) {
        listenForReferrals(user.uid);
    }
}
function showEarningHistoryPage() { showPage('earning-history-page'); }
function showWithdrawHistoryPage() { showPage('withdraw-history-page'); }
function showProfilePage() {
    showPage('profile-page');
    document.getElementById('profile-username').value = currentUserData.username || '';
    document.getElementById('profile-phone').value = currentUserData.phone || '';
    document.getElementById('profile-email').value = currentUserData.email || '';
    // Ab hum yahan par hamesha fixed dots dikhayenge
    document.getElementById('profile-password').value = '**********';
}
// --- DEPOSIT FUNCTIONALITY ---
function handleDepositProof(event) {
    event.preventDefault();
    const transactionId = document.getElementById('transaction-id-input').value;
    const senderName = document.getElementById('sender-name-input').value;
    const senderAccountNo = document.getElementById('sender-account-no-input').value;
    const submitBtn = event.target.querySelector('.upload-proof-btn');
    const user = auth.currentUser;
    if (!user) { alert('You are not logged in.'); return; }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    const newDepositRef = database.ref('deposits').push();
    const depositRequest = {
        depositId: newDepositRef.key,
        userId: user.uid,
        username: currentUserData.username,
        amount: parseFloat(currentPlan.price),
        planName: currentPlan.name,
        transactionId: transactionId,
        senderName: senderName,
        senderAccountNo: senderAccountNo,
        status: 'pending',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        taskCreated: false,
        referralNotified: false // Nayi field add ki gayi hai
    };
    newDepositRef.set(depositRequest)
        .then(() => {
            showCustomAlert('Your deposit request has been submitted for review.');
            event.target.reset();
            showDashboardPage();
        })
        .catch(error => showCustomAlert('Error: ' + error.message))
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Upload Proof';
        });
}
// ===== Function Change Start: listenForUserDeposits =====
function listenForUserDeposits(userId) {
    depositListener = database.ref('deposits').orderByChild('userId').equalTo(userId);
    depositListener.on('value', snapshot => {
        let totalApprovedAmount = 0;
        let pendingAmount = 0;
        const historyList = document.getElementById('deposits-history-list');
        historyList.innerHTML = '';
        if (!snapshot.exists()) {
            historyList.innerHTML = '<div class="no-deposits-message"><p>No deposit history found.</p></div>';
        } else {
            let rows = '';
            snapshot.forEach(childSnapshot => {
                const deposit = childSnapshot.val();
                if (deposit.status === 'approved') {
                    totalApprovedAmount += deposit.amount;
                    if (!deposit.taskCreated) {
                        createTaskForUser(deposit);
                    }
                    // *** NAYA CODE: Jab deposit approve ho to referrer ko update karein ***
                    if (!deposit.referralNotified) {
                        database.ref('users/' + userId).once('value').then(userSnapshot => {
                            if (userSnapshot.exists() && userSnapshot.val().referredBy) {
                                const referrerUid = userSnapshot.val().referredBy;
                                const referralNodeRef = database.ref(`users/${referrerUid}/referrals/${userId}`);
                                referralNodeRef.transaction(currentData => {
                                    if (currentData) {
                                        currentData.totalDeposit = (currentData.totalDeposit || 0) + deposit.amount;
                                    }
                                    return currentData;
                                });
                                database.ref(`deposits/${deposit.depositId}`).update({ referralNotified: true });
                            }
                        });
                    }
                    // *** NAYA CODE KHATAM ***
                } else if (deposit.status === 'pending') {
                    pendingAmount += deposit.amount;
                }
                const depositDate = new Date(deposit.createdAt).toLocaleDateString();
                const statusClass = `status-${deposit.status}`;
                const statusText = deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1);
                rows = `<div class="history-row">
                                        <span>${deposit.planName}</span>
                                        <span>${deposit.amount} PKR</span>
                                        <span>${depositDate}</span>
                                        <span class="${statusClass}">${statusText}</span>
                                     </div>` + rows;
            });
            historyList.innerHTML = rows;
        }
        document.getElementById('dashboard-total-deposits').textContent = `PKR ${totalApprovedAmount}`;
        document.getElementById('dashboard-pending-deposits').textContent = `PKR ${pendingAmount}`;
    });
}
// ===== Function Change End: listenForUserDeposits =====
function createTaskForUser(deposit) {
    const plan = planDetailsConfig[deposit.planName];
    if (!plan) {
        console.error("Plan details not found for:", deposit.planName);
        return;
    }
    const task = {
        userId: deposit.userId,
        depositId: deposit.depositId,
        planName: deposit.planName,
        dailyProfit: plan.dailyProfit,
        depositAmount: deposit.amount, // <-- YEH NAYI LINE ADD KI GAYI HAI
        duration: plan.duration,
        startDate: firebase.database.ServerValue.TIMESTAMP,
        lastClaimedTimestamp: 0
    };
    database.ref('user_tasks/' + deposit.userId + '/' + deposit.depositId).set(task)
        .then(() => {
            database.ref('deposits/' + deposit.depositId).update({ taskCreated: true });
        });
}
let players = {};
let playerTimers = {};
let isApiReady = false;
let currentVideoId = null;
function onYouTubeIframeAPIReady() {
    isApiReady = true;
}
function onPlayerReady(event) {
    const iframe = event.target.getIframe();
    const taskId = iframe.id.replace('player-area-', '');
    const user = auth.currentUser;
    if (user) {
        database.ref('user_tasks/' + user.uid + '/' + taskId).once('value', snapshot => {
            if (snapshot.exists()) {
                updateTaskActionButtonState(taskId, snapshot.val());
            }
        });
    }
}
function listenForUserTasks(userId) {
    const tasksRef = database.ref('user_tasks/' + userId);
    const videoAdRef = database.ref('settings/video_ad/url');
    const tasksContainer = document.getElementById('tasks-container');
    tasksRef.on('value', tasksSnapshot => {
        videoAdRef.once('value').then(videoSnapshot => {
            const videoUrl = videoSnapshot.val();
            if (videoUrl && typeof videoUrl === 'string') {
                let videoId = null;
                if (videoUrl.includes('embed/')) {
                    // Embed URL handle karega: https://www.youtube.com/embed/VIDEO_ID
                    const parts = videoUrl.split('embed/');
                    if (parts.length > 1) {
                        videoId = parts[1].split('?')[0];
                    }
                } else if (videoUrl.includes('watch?v=')) {
                    // Normal Watch URL handle karega: https://www.youtube.com/watch?v=VIDEO_ID
                    const parts = videoUrl.split('watch?v=');
                    if (parts.length > 1) {
                        videoId = parts[1].split('&')[0]; // '&' se aage ke parameters hata dega
                    }
                }
                currentVideoId = videoId;
            } else {
                currentVideoId = null;
            }
            const thumbnailUrl = currentVideoId ? `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg` : '';
            const newActiveTaskIds = new Set();
            if (tasksSnapshot.exists()) {
                tasksSnapshot.forEach(taskChild => {
                    // ===== EXPIRATION CHECK YAHAN ADD KIYA GAYA HAI =====
                    const task = taskChild.val();
                    const startDate = task.startDate;
                    const durationInDays = task.duration;
                    const durationInMillis = durationInDays * 24 * 60 * 60 * 1000;
                    const expirationTimestamp = startDate + durationInMillis;
                    const isExpired = Date.now() > expirationTimestamp;
                    // Agar plan expire nahi hua hai, tab hi usko list mein shamil karein
                    if (!isExpired) {
                        newActiveTaskIds.add(taskChild.key);
                    } else {
                        // Optional: Expired task ko database se delete kar dein
                        // database.ref('user_tasks/' + userId + '/' + taskChild.key).remove();
                    }
                    // ===== EXPIRATION CHECK KHATAM =====
                });
            }
            for (const taskId in players) {
                if (!newActiveTaskIds.has(taskId)) {
                    if (players[taskId] && typeof players[taskId].destroy === 'function') {
                        players[taskId].destroy();
                    }
                    delete players[taskId];
                    if (playerTimers[`timer-${taskId}`]) clearInterval(playerTimers[`timer-${taskId}`]);
                    delete playerTimers[`timer-${taskId}`];
                    document.getElementById(`task-card-${taskId}`)?.remove();
                }
            }
            // Pehle tasks container ko saaf karein
            tasksContainer.innerHTML = '';
            let hasVisibleTasks = false;
            if (!tasksSnapshot.exists() || newActiveTaskIds.size === 0) {
                tasksContainer.innerHTML = '<div class="no-history"><p>You have no active plans.</p></div>';
                return;
            }
            if (!currentVideoId) {
                tasksContainer.innerHTML = '<div class="no-history"><p>No tasks available right now.</p></div>';
                return;
            }
            tasksSnapshot.forEach(taskChild => {
                if (!newActiveTaskIds.has(taskChild.key)) return;
                const task = taskChild.val();
                const taskId = taskChild.key;
                hasVisibleTasks = true;
                // Sirf tab hi naya card banayein jab woh page par na ho
                if (!document.getElementById(`task-card-${taskId}`)) {
                    const playerAreaId = `player-area-${taskId}`;
                    const thumbnailId = `thumbnail-${taskId}`;
                    const actionAreaId = `action-area-${taskId}`;
                    let taskCard = document.createElement('div');
                    taskCard.className = 'plan-card';
                    taskCard.id = `task-card-${taskId}`;
                    tasksContainer.appendChild(taskCard);
                    taskCard.innerHTML = `
                                <h3 class="plan-title">${task.planName} (Profit: ${task.dailyProfit} PKR)</h3>
                                <div class="video-container" id="video-container-${taskId}" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 15px 0; border-radius: 10px; background: #000;">
                                    <img src="${thumbnailUrl}" id="${thumbnailId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; cursor:pointer;" onclick="runVideo('${taskId}')">
                                    <div id="${playerAreaId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
                                </div>
                                <div id="${actionAreaId}" style="margin-top: 15px;"></div>`;
                    if (isApiReady) {
                        players[taskId] = new YT.Player(playerAreaId, {
                            videoId: currentVideoId,
                            events: {
                                'onReady': onPlayerReady, // Player ke ready hone par is function ko call karein
                                'onStateChange': onPlayerStateChange
                            },
                            playerVars: { 'controls': 0, 'disablekb': 1, 'rel': 0, 'modestbranding': 1, 'showinfo': 0, 'iv_load_policy': 3, 'fs': 0 }
                        });
                    }
                }
                // Button ko har baar update karein
                updateTaskActionButtonState(taskId, task);
            });
            if (!hasVisibleTasks) {
                tasksContainer.innerHTML = '<div class="no-history"><p>You have no active plans.</p></div>';
            }
        });
    });
}
function runVideo(taskId) {
    const player = players[taskId];
    const thumbnail = document.getElementById(`thumbnail-${taskId}`);
    if (player && typeof player.playVideo === 'function') {
        if (thumbnail) thumbnail.style.display = 'none';
        player.playVideo();
        player.watchedTime = 0;
    } else {
        showCustomAlert("Video player is still loading. Please wait a moment.");
    }
}
function onPlayerStateChange(event) {
    const iframe = event.target.getIframe();
    const taskId = iframe.id.replace('player-area-', '');
    const actionArea = document.getElementById(`action-area-${taskId}`);
    const requiredWatchTime = 15;
    if (playerTimers[taskId]) clearInterval(playerTimers[taskId]);
    if (event.data == YT.PlayerState.PLAYING) {
        let watchedTime = players[taskId].watchedTime || 0;
        playerTimers[taskId] = setInterval(() => {
            watchedTime++;
            players[taskId].watchedTime = watchedTime;
            let remainingTime = requiredWatchTime - watchedTime;
            actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%; background: grey;" disabled>Time remaining: ${remainingTime > 0 ? remainingTime : 0}s</button>`;
            if (watchedTime >= requiredWatchTime) {
                clearInterval(playerTimers[taskId]);
                players[taskId].stopVideo();
                actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%;" onclick="claimProfit('${taskId}')">Claim Profit</button>`;
            }
        }, 1000);
    }
}
function claimProfit(taskId) {
    const user = auth.currentUser;
    if (!user) { alert('You are not logged in.'); return; }
    const taskRef = database.ref(`user_tasks/${user.uid}/${taskId}`);
    const userRef = database.ref(`users/${user.uid}`);
    const actionArea = document.getElementById(`action-area-${taskId}`);
    actionArea.innerHTML = `<button class="buy-plan-btn" disabled style="width:100%; background: grey;">Processing...</button>`;
    taskRef.transaction(task => {
        if (task) {
            const lastClaimTimestamp = task.lastClaimedTimestamp || 0;
            const cooldownPeriod = 24 * 60 * 60 * 1000;
            const timeSinceLastClaim = Date.now() - lastClaimTimestamp;
            if (timeSinceLastClaim >= cooldownPeriod) {
                task.lastClaimedTimestamp = firebase.database.ServerValue.TIMESTAMP;
                return task;
            }
        }
        return undefined;
    }).then(taskResult => {
        if (taskResult.committed && taskResult.snapshot.exists()) {
            const taskData = taskResult.snapshot.val();
            const dailyProfit = taskData.dailyProfit; // User ka apna profit yahan save hota hai
            // ===== USER A KI APNI EARNING THEEK KARNE KA CODE START =====
            userRef.transaction(currentUserData => {
                if (currentUserData) {
                    // Yahan par humesha `dailyProfit` hi jama hoga
                    currentUserData.balance = (currentUserData.balance || 0) + dailyProfit;
                    currentUserData.totalProfit = (currentUserData.totalProfit || 0) + dailyProfit;
                }
                return currentUserData;
            }).then(() => {
                showCustomAlert(`Profit of ${dailyProfit} PKR claimed!`);
                updateTaskActionButtonState(taskId, taskData);
                // ===== USER A KI APNI EARNING THEEK KARNE KA CODE END =====
                // === REFERRAL COMMISSION KA LOGIC (Yeh alag se kaam karega) ===
                userRef.once('value', snapshot => {
                    const userData = snapshot.val();
                    if (userData && userData.referredBy) {
                        const referrerUid = userData.referredBy;
                        const commissionRate = 1.7;
                        // Commission ke liye hum `depositAmount` istemal kar rahe hain
                        const commissionAmount = (taskData.depositAmount * commissionRate) / 100;
                        if (commissionAmount > 0) {
                            const referrerRef = database.ref('users/' + referrerUid);
                            referrerRef.transaction(referrerData => {
                                if (referrerData) {
                                    referrerData.balance = (referrerData.balance || 0) + commissionAmount;
                                    referrerData.totalCommission = (referrerData.totalCommission || 0) + commissionAmount;
                                }
                                return referrerData;
                            });
                            const referralNodeRef = database.ref(`users/${referrerUid}/referrals/${user.uid}`);
                            referralNodeRef.transaction(currentData => {
                                if (currentData) {
                                    currentData.totalBonus = (currentData.totalBonus || 0) + commissionAmount;
                                }
                                return currentData;
                            });
                        }
                    }
                });
                // === COMMISSION LOGIC KHATAM ===
            });
        } else {
            showCustomAlert("Profit cannot be claimed yet. Please wait.");
            taskRef.once('value', snapshot => updateTaskActionButtonState(taskId, snapshot.val()));
        }
    }).catch(error => {
        showCustomAlert("Error claiming profit: " + error.message);
        taskRef.once('value', snapshot => updateTaskActionButtonState(taskId, snapshot.val()));
    });
}
// ===== Function Change End: claimProfit =====
// --- HELPER FUNCTIONS ---
function showDepositPaymentPage(planName, planPrice) {
    if (planName && planPrice) {
        currentPlan = { name: planName, price: planPrice };
    }
    showPage('deposit-payment-page');
}
function showDepositDetailsPage(method) {
    showPage('deposit-details-page');
    const account = depositAccounts[method];
    document.getElementById('deposit-method-logo').src = logos[method];
    document.getElementById('deposit-amount-details').textContent = `${currentPlan.price} PKR`;
    document.getElementById('deposit-bank-name').textContent = account.bank;
    document.getElementById('deposit-account-name').textContent = account.name;
    document.getElementById('deposit-account-no').textContent = account.number;
}
function showWithdrawFundPage(method) {
    currentWithdrawMethod = method;
    showPage('withdraw-fund-page');
    document.getElementById('withdraw-logo').src = logos[method];
    document.getElementById('withdraw-logo').alt = `${method} Logo`;
}
function copyLink(inputId) {
    // Step 1: Input field ko uski ID se hasil karein
    const linkInput = document.getElementById(inputId);
    // Step 2: Input ke text ko select karein
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // Yeh line mobile browsers ke liye zaroori hai
    try {
        // Step 3: Copy command chalaein
        document.execCommand('copy');
        // Kamyabi ka message dikhayein
        showCustomAlert('Referral link copy ho gaya!');
    } catch (err) {
        // Agar copy na ho sake to error dikhayein
        showCustomAlert('Link copy nahi ho saka. Baraye meharbani manual copy karein.');
    }
}
function openGroupChat() {
    const groupLink = "https://whatsapp.com/channel/0029VbAtpkx4inovaSRul70x";
    window.open(groupLink, '_blank');
}
function contactAdmin() {
    window.location.href = "mailto:x4uearncontact.com";
}
function handleWithdraw(event) {
    event.preventDefault();
    const accountName = document.getElementById('withdraw-account-name').value;
    const accountNo = document.getElementById('withdraw-account-no').value;
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const submitBtn = event.target.querySelector('.withdraw-now-btn');
    const user = auth.currentUser;
    if (!user) { alert('You are not logged in.'); return; }
    if (isNaN(amount) || amount <= 0) {
        showCustomAlert('Please enter a valid amount.');
        return;
    }
    if (amount < 10) {
        showCustomAlert('Minimum withdrawal amount is PKR 10.');
        return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    const userRef = database.ref('users/' + user.uid);
    userRef.transaction(currentData => {
        if (currentData) {
            if ((currentData.balance || 0) >= amount) {
                currentData.balance = currentData.balance - amount;
                return currentData;
            }
        }
        return undefined;
    })
        .then(transactionResult => {
            if (transactionResult.committed) {
                const newWithdrawalRef = database.ref('withdrawals').push();
                const withdrawalRequest = {
                    withdrawalId: newWithdrawalRef.key,
                    userId: user.uid,
                    username: currentUserData.username,
                    method: currentWithdrawMethod,
                    accountName: accountName,
                    accountNo: accountNo,
                    amount: amount,
                    status: 'pending',
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                };
                return newWithdrawalRef.set(withdrawalRequest);
            } else {
                throw new Error('Insufficient balance.');
            }
        })
        .then(() => {
            showCustomAlert('Withdrawal request submitted successfully!');
            event.target.reset();
            showDashboardPage();
        })
        .catch(error => {
            showCustomAlert('Error: ' + error.message);
            if (error.message !== 'Insufficient balance.') {
                // Agar koi aur error aati hai to amount wapis karne ki koshish karein
                userRef.transaction(currentData => {
                    if (currentData) {
                        currentData.balance = (currentData.balance || 0) + amount;
                    }
                    return currentData;
                });
            }
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Withdraw Now';
        });
}
function listenForUserWithdrawals(userId) {
    if (withdrawalListener) {
        withdrawalListener.off();
    }
    withdrawalListener = database.ref('withdrawals').orderByChild('userId').equalTo(userId);
    withdrawalListener.on('value', snapshot => {
        let totalApprovedWithdrawals = 0;
        let totalPendingWithdrawals = 0;
        const withdrawHistoryList = document.getElementById('withdraw-history-list');
        withdrawHistoryList.innerHTML = ''; // List ko saaf karein
        if (!snapshot.exists()) {
            withdrawHistoryList.innerHTML = '<div class="no-history"><p>No Withdraw History Found.</p></div>';
        } else {
            let rows = '';
            let count = 0; // Records ginne ke liye counter
            snapshot.forEach(childSnapshot => {
                count++; // Counter ko barhayein
                const withdrawal = childSnapshot.val();
                if (withdrawal.status === 'approved') {
                    totalApprovedWithdrawals += withdrawal.amount;
                } else if (withdrawal.status === 'pending') {
                    totalPendingWithdrawals += withdrawal.amount;
                }
                const withdrawalDate = new Date(withdrawal.createdAt).toLocaleDateString();
                const statusClass = `status-${withdrawal.status}`;
                const statusText = withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1);
                // Row ko 5 columns ke saath banayein (bina inline style ke)
                rows = `<div class="history-row">
                                        <span>${count}</span>
                                        <span>${withdrawalDate}</span>
                                        <span>${withdrawal.method}</span>
                                        <span>${withdrawal.amount} PKR</span>
                                        <span class="${statusClass}">${statusText}</span>
                                     </div>` + rows;
            });
            // Yahan se extra header banane wala code hata diya gaya hai
            withdrawHistoryList.innerHTML = rows;
        }
        document.getElementById('dashboard-total-withdraws').textContent = `PKR ${totalApprovedWithdrawals}`;
        document.getElementById('dashboard-pending-withdraws').textContent = `PKR ${totalPendingWithdrawals}`;
    });
}
let earningHistoryListener = null;
function updateTaskActionButtonState(taskId, taskData) {
    const actionArea = document.getElementById(`action-area-${taskId}`);
    if (!actionArea) return;
    const lastClaimTimestamp = taskData.lastClaimedTimestamp || 0;
    const cooldownPeriod = 24 * 60 * 60 * 1000;
    const isClickable = (Date.now() - lastClaimTimestamp) >= cooldownPeriod;
    if (playerTimers[`timer-${taskId}`]) {
        clearInterval(playerTimers[`timer-${taskId}`]);
        delete playerTimers[`timer-${taskId}`];
    }
    if (isClickable) {
        const player = players[taskId];
        // YEH HAI NAYA BADLAV: Hum check kar rahe hain ki player video chalaane ke liye taiyaar hai ya nahi
        if (player && typeof player.playVideo === 'function') {
            actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%" onclick="runVideo('${taskId}')">Run Video</button>`;
        } else {
            // Agar player ready nahi hai, to "Loading" dikhayein taake user click na kar sake
            actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%; background-color:#34495e; cursor:not-allowed;" disabled>Loading Video...</button>`;
        }
    } else {
        const updateTimer = () => {
            const timeLeft = cooldownPeriod - (Date.now() - lastClaimTimestamp);
            if (timeLeft > 0) {
                const h = Math.floor(timeLeft / 3600000);
                const m = Math.floor((timeLeft % 3600000) / 60000);
                const s = Math.floor((timeLeft % 60000) / 1000);
                actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%; background-color:#34495e; cursor:not-allowed;" disabled>Next ad in: ${h}h ${m}m ${s}s</button>`;
            } else {
                // Timer poora hone par bhi check karein ki player ready hai ya nahi
                const player = players[taskId];
                if (player && typeof player.playVideo === 'function') {
                    actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%" onclick="runVideo('${taskId}')">Run Video</button>`;
                } else {
                    actionArea.innerHTML = `<button class="buy-plan-btn" style="width:100%; background-color:#34495e; cursor:not-allowed;" disabled>Loading Video...</button>`;
                }
                if (playerTimers[`timer-${taskId}`]) {
                    clearInterval(playerTimers[`timer-${taskId}`]);
                    delete playerTimers[`timer-${taskId}`];
                }
            }
        };
        updateTimer();
        playerTimers[`timer-${taskId}`] = setInterval(updateTimer, 1000);
    }
}
function listenForUserEarnings(userId) {
    if (earningHistoryListener) {
        earningHistoryListener.off();
    }
    earningHistoryListener = database.ref('earning_history').orderByChild('userId').equalTo(userId);
    earningHistoryListener.on('value', snapshot => {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        if (!snapshot.exists()) {
            historyList.innerHTML = '<div class="no-history"><p>No Earning History Found.</p></div>';
        } else {
            let rows = '';
            let count = 0;
            snapshot.forEach(childSnapshot => {
                const earning = childSnapshot.val();
                count++;
                const earningDate = new Date(earning.createdAt).toLocaleDateString();
                rows = `<div class="history-row">
                                        <span>${count}</span>
                                        <span>${earningDate}</span>
                                        <span>${earning.planName || 'N/A'}</span>
                                        <span>${earning.amount} PKR</span>
                                     </div>` + rows;
            });
            historyList.innerHTML = rows;
        }
    });
}
// ===== Function Change Start: listenForReferrals =====
function listenForReferrals(userId) {
    const referralsListContainer = document.getElementById('referrals-list');
    referralsListContainer.innerHTML = '<div class="no-referrals"><p>Loading referrals...</p></div>';
    const referralsRef = database.ref('users/' + userId + '/referrals');
    referralsRef.on('value', snapshot => {
        if (!snapshot.exists()) {
            referralsListContainer.innerHTML = '<div class="no-referrals"><p>No referrals found.</p></div>';
            return;
        }
        referralsListContainer.innerHTML = ''; // Pehle list ko clear karein
        let count = 0;
        snapshot.forEach(childSnapshot => {
            count++;
            const referralData = childSnapshot.val();
            const referralRow = document.createElement('div');
            // *** NAYI CLASS ADD KI GAYI HAI ***
            referralRow.className = 'referral-row';
            // *** HTML AB NAYE DATA KE SAATH UPDATE HOGA ***
            referralRow.innerHTML = `
                        <span>${count}</span>
                        <span>${referralData.username}</span>
                        <span>${new Date(referralData.joinDate).toLocaleDateString()}</span>
                        <span>${(referralData.totalDeposit || 0).toFixed(2)}</span>
                        <span>${(referralData.totalBonus || 0).toFixed(2)}</span>
                    `;
            referralsListContainer.appendChild(referralRow);
        });
    }, error => {
        referralsListContainer.innerHTML = '<div class="no-referrals"><p>Could not load referrals.</p></div>';
        console.error("Error loading referrals:", error);
    });
}
// ===== Function Change End: listenForReferrals =====
function toggleAuthPages() {
    const signupPage = document.getElementById('signup-page');
    const loginPage = document.getElementById('login-page');
    if (signupPage.style.display === 'none') {
        signupPage.style.display = 'flex'; loginPage.style.display = 'none';
    } else {
        signupPage.style.display = 'none'; loginPage.style.display = 'flex';
    }
}';
    }
}
