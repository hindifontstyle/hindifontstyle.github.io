document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const fontStyles = document.querySelector('.font-styles');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    // Define all font styles
    const styles = [
        { name: 'नोटो सैन्स', family: 'Noto Sans Devanagari' },
        { name: 'बालू', family: 'Baloo 2' },
        { name: 'पॉपिन्स', family: 'Poppins' },
        { name: 'हिन्द', family: 'Hind' },
        { name: 'मुक्ता', family: 'Mukta' },
        { name: 'तिरो देवनागरी', family: 'Tiro Devanagari Hindi' },
        { name: 'बालू भाई', family: 'Baloo Bhai 2' },
        { name: 'कर्मा', family: 'Karma' },
        { name: 'कलम', family: 'Kalam' },
        { name: 'बालू तम्बी', family: 'Baloo Thambi 2' },
        { name: 'रोझा वन', family: 'Rozha One' },
        { name: 'गोटू', family: 'Gotu' },
        { name: 'बालू पाजी', family: 'Baloo Paaji 2' },
        { name: 'बालू चेट्टन', family: 'Baloo Chettan 2' },
        { name: 'अनेक देवनागरी', family: 'Anek Devanagari' },
        { name: 'बालू भैना', family: 'Baloo Bhaina 2' },
        { name: 'यंत्रमानव', family: 'Yantramanav' },
        { name: 'कम्बे', family: 'Cambay' },
        { name: 'खुला', family: 'Khula' },
        { name: 'मार्टेल', family: 'Martel' },
        { name: 'सरला', family: 'Sarala' },
        { name: 'यात्रा वन', family: 'Yatra One' },
        { name: 'बिरयानी', family: 'Biryani' },
        { name: 'साहित्य', family: 'Sahitya' },
        { name: 'अमिता', family: 'Amita' },
        { name: 'एक्ज़ार', family: 'Eczar' },
        { name: 'हलन्त', family: 'Halant' },
        { name: 'लैला', family: 'Laila' },
        // Additional 20 fonts
        { name: 'राजधानी', family: 'Rajdhani' },
        { name: 'परमार', family: 'Parmar' },
        { name: 'कृति', family: 'Kruthi' },
        { name: 'संस्कृत', family: 'Sanskrit Text' },
        { name: 'मोदक', family: 'Modak' },
        { name: 'सूर्य देवनागरी', family: 'Sura Devanagari' },
        { name: 'जयकृष्ण', family: 'Jay Krishna' },
        { name: 'कैथी', family: 'Kaithi' },
        { name: 'कुटी देव', family: 'Kutti Dev' },
        { name: 'शोभा', family: 'Shobha' },
        { name: 'पटुआ', family: 'Patua One' },
        { name: 'गंगा', family: 'Ganga' },
        { name: 'जम्बू', family: 'Jambu' },
        { name: 'वसुधा', family: 'Vasudha' },
        { name: 'शिव', family: 'Shiv' },
        { name: 'आदित्य', family: 'Aditya' },
        { name: 'वरुण', family: 'Varun' },
        { name: 'विक्रम', family: 'Vikram' },
        { name: 'अरुण', family: 'Arun' },
        { name: 'देवप्रिया', family: 'Devpriya' }
    ];

    // Pagination settings
    const itemsPerPage = 12;
    let currentPage = 1;
    const totalPages = Math.ceil(styles.length / itemsPerPage);

    // Update pagination display
    function updatePagination() {
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = totalPages;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    // Function to create style boxes for current page
    function createStyleBoxes() {
        fontStyles.innerHTML = ''; // Clear existing styles
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, styles.length);
        
        styles.slice(startIndex, endIndex).forEach(style => {
            const box = document.createElement('div');
            box.className = 'font-style-box';
            
            const title = document.createElement('h3');
            title.textContent = style.name;
            
            const text = document.createElement('p');
            text.style.fontFamily = style.family;
            text.style.fontSize = '1.2rem';
            text.style.minHeight = '60px';
            text.style.display = 'flex';
            text.style.alignItems = 'center';
            text.style.justifyContent = 'center';
            text.style.textAlign = 'center';
            text.style.margin = '1rem 0';
            
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'button-group';

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> कॉपी करें';

            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> डाउनलोड';

            buttonGroup.appendChild(copyBtn);
            buttonGroup.appendChild(downloadBtn);
            
            box.appendChild(title);
            box.appendChild(text);
            box.appendChild(buttonGroup);
            
            fontStyles.appendChild(box);

            // Copy button functionality
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(text.textContent)
                    .then(() => {
                        const originalText = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<i class="fas fa-check"></i> कॉपी हो गया!';
                        setTimeout(() => {
                            copyBtn.innerHTML = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Copy failed:', err);
                    });
            });

            // Download button functionality
            downloadBtn.addEventListener('click', async () => {
                try {
                    // Create a temporary div for the image
                    const tempDiv = document.createElement('div');
                    tempDiv.style.padding = '20px';
                    tempDiv.style.background = 'white';
                    tempDiv.style.position = 'fixed';
                    tempDiv.style.left = '-9999px';
                    tempDiv.style.top = '0';
                    
                    // Create the text element with the same style
                    const textElement = document.createElement('p');
                    textElement.style.fontFamily = style.family;
                    textElement.textContent = text.textContent;
                    textElement.style.fontSize = '2rem';
                    textElement.style.margin = '0';
                    textElement.style.padding = '20px';
                    textElement.style.textAlign = 'center';
                    textElement.style.color = '#000';
                    
                    tempDiv.appendChild(textElement);
                    document.body.appendChild(tempDiv);

                    // Wait for font to load
                    await document.fonts.load(`1rem "${style.family}"`);
                    
                    // Convert to canvas
                    const canvas = await html2canvas(tempDiv, {
                        backgroundColor: 'white',
                        scale: 3,
                        logging: false,
                        allowTaint: true,
                        useCORS: true,
                        onclone: (clonedDoc) => {
                            const clonedElement = clonedDoc.querySelector('p');
                            clonedElement.style.fontFamily = style.family;
                        }
                    });

                    // Remove temporary div
                    document.body.removeChild(tempDiv);

                    // Convert to image and download
                    const image = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = `hindi-font-${style.name}-${Date.now()}.png`;
                    link.click();

                    // Show success feedback
                    const originalText = downloadBtn.innerHTML;
                    downloadBtn.innerHTML = '<i class="fas fa-check"></i> डाउनलोड हो गया!';
                    setTimeout(() => {
                        downloadBtn.innerHTML = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Download failed:', err);
                }
            });
        });
    }

    // Pagination button handlers
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createStyleBoxes();
            updatePagination();
            updateText();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            createStyleBoxes();
            updatePagination();
            updateText();
        }
    });

    // Update text in all style boxes
    function updateText() {
        const text = inputText.value || 'यहाँ आपका टेक्स्ट दिखेगा...';
        document.querySelectorAll('.font-style-box p').forEach(p => {
            p.textContent = text;
        });
    }

    // Input text change handler
    inputText.addEventListener('input', updateText);

    // Initialize
    createStyleBoxes();
    updatePagination();

    // Input action buttons
    const clearBtn = document.querySelector('.clear-btn');
    const pasteBtn = document.getElementById('paste-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        updateText();
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
            updateText();
        } catch (err) {
            console.error('Failed to paste:', err);
        }
    });

    clearAllBtn.addEventListener('click', () => {
        inputText.value = '';
        updateText();
    });
});