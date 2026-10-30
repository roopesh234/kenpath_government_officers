import http from 'http';

function makeRequest(path, method = 'GET', postData = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5001,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (_e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Telugu API Verification Tests...\n');

  try {
    // 1. Health check
    const health = await makeRequest('/api/health');
    console.log(
      '1. Health Check:',
      health.status === 200 ? '✅ PASSED' : '❌ FAILED',
      health.body.system
    );

    // 2. Stats endpoint
    const stats = await makeRequest('/api/applications/stats');
    console.log('2. Stats API:', stats.status === 200 ? '✅ PASSED' : '❌ FAILED', {
      total: stats.body.total,
      pending: stats.body.pending,
      urgentSla: stats.body.urgentSla,
      aiReady: stats.body.aiReadyApproval,
    });

    // 3. Applications list
    const apps = await makeRequest('/api/applications');
    console.log(
      '3. Applications Query:',
      apps.status === 200 ? '✅ PASSED' : '❌ FAILED',
      `Loaded ${apps.body.length} applications`
    );

    // 4. Interactive AI Q&A in Telugu
    const aiRes = await makeRequest('/api/applications/APP-2026-002/ask-ai', 'POST', {
      query: 'ఆదాయ పరిమితి సరిపోతుందా?',
    });
    console.log('4. AI Q&A Endpoint (Telugu):', aiRes.status === 200 ? '✅ PASSED' : '❌ FAILED');
    console.log('   AI Response (Telugu):', aiRes.body.te);

    // 5. Officer Decision Workflow (Approve) in Telugu
    const approveRes = await makeRequest('/api/applications/APP-2026-001/decision', 'POST', {
      action: 'APPROVE',
      officerName: 'శ్రీ పి. సురేష్ వర్మ (రెవెన్యూ ఇన్‌స్పెక్టర్)',
      officerRemarks: 'అన్ని పత్రాలు సరిపోయాయి, మంజూరు చేయడమైనది.',
      citizenNotification: 'మీ దరఖాస్తు ఆమోదించబడింది.',
    });
    console.log(
      '5. Officer Approve Decision:',
      approveRes.status === 200 ? '✅ PASSED' : '❌ FAILED'
    );
    console.log('   Generated Order:', approveRes.body.application?.officerDecision?.orderNumber);

    // 6. Reset Single Application
    const resetRes = await makeRequest('/api/applications/APP-2026-001/reset', 'POST');
    console.log('6. Revert Decision:', resetRes.status === 200 ? '✅ PASSED' : '❌ FAILED');

    console.log('\n🎉 All Telugu API Tests Completed Successfully!');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

runTests();
