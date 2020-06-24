#include <SoftwareSerial.h>
#define SCREEN_WIDTH 32
#define SCREEN_HEIGHT 16
#define BUFLENGTH 512

/*--------------------------------------------------------------------------------------
  DMD Includes
--------------------------------------------------------------------------------------*/
#include <SPI.h>
#include <DMD.h>
#include <TimerOne.h>

#define DISPLAYS_ACROSS 1
#define DISPLAYS_DOWN 1
DMD dmd(DISPLAYS_ACROSS, DISPLAYS_DOWN);

void ScanDMD() { 
  dmd.scanDisplayBySPI();
}

/*--------------------------------------------------------------------------------------
  SerialDMD
--------------------------------------------------------------------------------------*/
char buf[BUFLENGTH];
int bufCount;

void setup() {
  Serial.begin(57600);

  Timer1.initialize(4000);
  Timer1.attachInterrupt(ScanDMD);

  dmd.clearScreen(true);
}

void loop() {
  if (Serial.available() > 0) {
    serialParse();
  }
}

void serialParse(void) {
  bufCount = -1;
  bufCount = Serial.readBytesUntil('\n', buf, BUFLENGTH);

  if (bufCount > 0) {
    parseBuffer(buf);
  }
}

void parseBuffer(char* buf) {
  dmd.clearScreen(true);

  int i = 0;

  for (byte y = 0; y < SCREEN_HEIGHT; y++) {
    for (byte x = 0; x < SCREEN_WIDTH; x++) {
      if ((char)buf[i] == '1') {
        dmd.drawFilledBox(x, y, x, y, GRAPHICS_NORMAL);
      }
      i++;
    }
  }
}