// Speed test implementation using real measurements
export async function measureDownloadSpeed(): Promise<number> {
  const startTime = performance.now();
  const fileSize = 5 * 1024 * 1024; // 5MB test file
  const testFile = 'https://speed.cloudflare.com/__down?bytes=5000000'; // Using Cloudflare's speed test endpoint
  
  try {
    const response = await fetch(testFile);
    if (!response.ok) throw new Error('Download test failed');
    
    const reader = response.body?.getReader();
    let receivedLength = 0;
    
    if (!reader) throw new Error('Failed to start download');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedLength += value.length;
    }

    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;
    const speedMbps = (fileSize * 8) / (1024 * 1024 * durationInSeconds);
    
    return Math.min(speedMbps, 1000); // Cap at 1000 Mbps for realistic results
  } catch (error) {
    console.error('Speed test failed:', error);
    throw new Error('Failed to measure download speed');
  }
}

export async function measureUploadSpeed(): Promise<number> {
  const startTime = performance.now();
  const sampleSize = 2 * 1024 * 1024; // 2MB sample
  const data = new Blob([new ArrayBuffer(sampleSize)]);
  
  try {
    const response = await fetch('https://speed.cloudflare.com/__up', {
      method: 'POST',
      body: data
    });
    
    if (!response.ok) throw new Error('Upload test failed');

    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;
    const speedMbps = (sampleSize * 8) / (1024 * 1024 * durationInSeconds);
    
    return Math.min(speedMbps, 1000); // Cap at 1000 Mbps for realistic results
  } catch (error) {
    console.error('Upload test failed:', error);
    throw new Error('Failed to measure upload speed');
  }
}

export async function measurePing(): Promise<number> {
  const endpoints = [
    'https://www.cloudflare.com/cdn-cgi/trace',
    'https://www.google.com/generate_204',
    'https://www.microsoft.com'
  ];
  
  const pingEndpoint = async (url: string): Promise<number> => {
    const startTime = performance.now();
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors', // Important: allows requests to any domain
        cache: 'no-store',
      });
      const endTime = performance.now();
      return endTime - startTime;
    } catch (error) {
      throw new Error('Endpoint unavailable');
    }
  };

  // Try each endpoint until one succeeds
  for (const endpoint of endpoints) {
    try {
      const attempts = 3;
      let totalTime = 0;
      
      for (let i = 0; i < attempts; i++) {
        const pingTime = await pingEndpoint(endpoint);
        totalTime += pingTime;
        
        // Small delay between attempts
        if (i < attempts - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      const averagePing = totalTime / attempts;
      return Math.min(averagePing, 1000); // Cap at 1000ms for realistic results
    } catch (error) {
      continue; // Try next endpoint if current one fails
    }
  }
  
  throw new Error('Could not measure ping. Please check your internet connection.');
}