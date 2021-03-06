FSS - TSO Full Screen Services
SCRUPLES - Panel to FSS Compiler

Coding FSS calls to create small and simple screens is pretty easy. It can quickly become a more difficult task as the size and complexity of the screen grows. SCRUPLES is a program that "compiles" an ISPF-like panel definition to produce the FSS function calls to define the screen.

Invoking the SCRUPLES Panel Compiler

scruples input-panel output-c-source
input-panel is the panel source file to be compiled
output-c-source is the c source code file that will be created

Panel Specification

A panel consists of several sections:

    Comments
    )ATTR - Attribute Definition
    )BODY - Definition of Fields
    )PROC - Processing Section

Comments
Any input lines appearing before the beginning of the )ATTR section are treated as comments and are ignored by the SCRUPLES compiler.

)ATTR - Attribute Section
The ATTR section specifies the field attributes. A minimum of three attributes must always be defined. By default these are "%", "+" and "_". The default attribute characters can be changed with the DEFAULT parameter on the )ATTR line.

    The "%" attribute is defined as: TYPE(TEXT) INTENS(HI)
    The "+" attribute is defined as: TYPE(TEXT) INTENS(LOW)
    The "_" attribute is defines as: TYPE(INTPUT) INTENS(LOW)

Additional attribute characters can be defined in the ATTR section. You must specify the attribute character followed by its characteristics:

    TYPE( INPUT / OUTPUT / TEXT )
    INTENS( HI / LOW / NON )
    COLOR( BLUE / RED / PINK / GREEN / TURQ / YELLOW / WHITE )
    HILITE( BLINK / REVERSE / USCORE )


)BODY
The BODY section defines the body of the panel. The attribute characters are used to define the beginning and ending of the various fields. An input or output variable is expected to be followed by a variable name. A special variable name of "Z" has a special meaning. The Z variable is a place holder and is replaced with a value specified in the PROC section. The Z variable can be used to assign a longer name to a short field.

The BODY section can contain a maximum of 24 lines.

PROC
The PROC section is provided so that ZVARS values can be specified. The ZVARS values are used in place of the place holder "Z" specified on the panel. The Z vars are replaced in the order they appear in the body from left to right, top to bottom.

If no ZVARS are used, the PROC section may be omitted.

)END
The END section is used to signal the end of data for the panel definition.
Sample Panel Input to SCRUPLES

 
##
## Panel definition for Data Set Browser
##
##  tommy@tommysprinkle.com
##
)ATTR DEFAULT(%+_)
   ! TYPE(OUTPUT) INTENS(HIGH)
   : TYPE(OUTPUT) INTENS(LOW)
)BODY
!MSG1                        +Dataset Browser!MSG2                             +
+Command%===>_COMMAND                                                          +
+Dataset%----!DSN                                         +
+TTR    %===>_TTR   + Show Key%===>_Z+    Key%----:Z  +  Data%----:DATAL     +
     +Offset  %0...2... 4...6... 8...A... C...E...
     :OFF01 + :HEX01                              + :PRT01               +
     :OFF02 + :HEX02                              + :PRT02               +
     :OFF03 + :HEX03                              + :PRT03               +
     :OFF04 + :HEX04                              + :PRT04               +
     :OFF05 + :HEX05                              + :PRT05               +
     :OFF06 + :HEX06                              + :PRT06               +
     :OFF07 + :HEX07                              + :PRT07               +
     :OFF08 + :HEX08                              + :PRT08               +
     :OFF09 + :HEX09                              + :PRT09               +
     :OFF10 + :HEX10                              + :PRT10               +
     :OFF11 + :HEX11                              + :PRT11               +
     :OFF12 + :HEX12                              + :PRT12               +
     :OFF13 + :HEX13                              + :PRT13               +
     :OFF14 + :HEX14                              + :PRT14               +
     :OFF15 + :HEX15                              + :PRT15               +
     :OFF16 + :HEX16                              + :PRT16               +
     :OFF17 + :HEX17                              + :PRT17               +
     :OFF18 + :HEX18                              + :PRT18               +
     :OFF19 + :HEX19                              + :PRT19               +
)PROC
  .ZVARS = (SHOWKEY KEYL )
)END

Output from SCRUPLES

 	
/* ---- Generated By SCRUPLES ----- */
/* ----- Fri Dec 21 23:20:04 2012 ----- */

      fssFld(1, 2, 0X000038, "MSG1", 28, "");
      fssTxt(1, 31, 0X000030, "Dataset Browser");
      fssFld(1, 47, 0X000038, "MSG2", 33, "");
      fssTxt(2, 2, 0X000030, "Command");
      fssTxt(2, 10, 0X000038, "===>");
      fssFld(2, 15, 0X000000, "COMMAND", 65, "");
      fssTxt(3, 2, 0X000030, "Dataset");
      fssTxt(3, 10, 0X000038, "----");
      fssFld(3, 15, 0X000038, "DSN", 44, "");
      fssTxt(4, 2, 0X000030, "TTR");
      fssTxt(4, 10, 0X000038, "===>");
      fssFld(4, 15, 0X000000, "TTR", 6, "");
      fssTxt(4, 22, 0X000030, " Show Key");
      fssTxt(4, 32, 0X000038, "===>");
      fssFld(4, 37, 0X000000, "SHOWKEY", 1, "");
      fssTxt(4, 39, 0X000030, "    Key");
      fssTxt(4, 47, 0X000038, "----");
      fssFld(4, 52, 0X000030, "KEYL", 3, "");
      fssTxt(4, 56, 0X000030, "  Data");
      fssTxt(4, 63, 0X000038, "----");
      fssFld(4, 68, 0X000030, "DATAL", 10, "");
      fssTxt(5, 7, 0X000030, "Offset");
      fssTxt(5, 16, 0X000038, "0...2... 4...6... 8...A... C...E...");
      fssFld(6, 7, 0X000030, "OFF01", 6, "");
      fssFld(6, 16, 0X000030, "HEX01", 35, "");
      fssFld(6, 54, 0X000030, "PRT01", 20, "");
      fssFld(7, 7, 0X000030, "OFF02", 6, "");
      fssFld(7, 16, 0X000030, "HEX02", 35, "");
      fssFld(7, 54, 0X000030, "PRT02", 20, "");
      fssFld(8, 7, 0X000030, "OFF03", 6, "");
      fssFld(8, 16, 0X000030, "HEX03", 35, "");
      fssFld(8, 54, 0X000030, "PRT03", 20, "");
      fssFld(9, 7, 0X000030, "OFF04", 6, "");
      fssFld(9, 16, 0X000030, "HEX04", 35, "");
      fssFld(9, 54, 0X000030, "PRT04", 20, "");
      fssFld(10, 7, 0X000030, "OFF05", 6, "");
      fssFld(10, 16, 0X000030, "HEX05", 35, "");
      fssFld(10, 54, 0X000030, "PRT05", 20, "");
      fssFld(11, 7, 0X000030, "OFF06", 6, "");
      fssFld(11, 16, 0X000030, "HEX06", 35, "");
      fssFld(11, 54, 0X000030, "PRT06", 20, "");
      fssFld(12, 7, 0X000030, "OFF07", 6, "");
      fssFld(12, 16, 0X000030, "HEX07", 35, "");
      fssFld(12, 54, 0X000030, "PRT07", 20, "");
      fssFld(13, 7, 0X000030, "OFF08", 6, "");
      fssFld(13, 16, 0X000030, "HEX08", 35, "");
      fssFld(13, 54, 0X000030, "PRT08", 20, "");
      fssFld(14, 7, 0X000030, "OFF09", 6, "");
      fssFld(14, 16, 0X000030, "HEX09", 35, "");
      fssFld(14, 54, 0X000030, "PRT09", 20, "");
      fssFld(15, 7, 0X000030, "OFF10", 6, "");
      fssFld(15, 16, 0X000030, "HEX10", 35, "");
      fssFld(15, 54, 0X000030, "PRT10", 20, "");
      fssFld(16, 7, 0X000030, "OFF11", 6, "");
      fssFld(16, 16, 0X000030, "HEX11", 35, "");
      fssFld(16, 54, 0X000030, "PRT11", 20, "");
      fssFld(17, 7, 0X000030, "OFF12", 6, "");
      fssFld(17, 16, 0X000030, "HEX12", 35, "");
      fssFld(17, 54, 0X000030, "PRT12", 20, "");
      fssFld(18, 7, 0X000030, "OFF13", 6, "");
      fssFld(18, 16, 0X000030, "HEX13", 35, "");
      fssFld(18, 54, 0X000030, "PRT13", 20, "");
      fssFld(19, 7, 0X000030, "OFF14", 6, "");
      fssFld(19, 16, 0X000030, "HEX14", 35, "");
      fssFld(19, 54, 0X000030, "PRT14", 20, "");
      fssFld(20, 7, 0X000030, "OFF15", 6, "");
      fssFld(20, 16, 0X000030, "HEX15", 35, "");
      fssFld(20, 54, 0X000030, "PRT15", 20, "");
      fssFld(21, 7, 0X000030, "OFF16", 6, "");
      fssFld(21, 16, 0X000030, "HEX16", 35, "");
      fssFld(21, 54, 0X000030, "PRT16", 20, "");
      fssFld(22, 7, 0X000030, "OFF17", 6, "");
      fssFld(22, 16, 0X000030, "HEX17", 35, "");
      fssFld(22, 54, 0X000030, "PRT17", 20, "");
      fssFld(23, 7, 0X000030, "OFF18", 6, "");
      fssFld(23, 16, 0X000030, "HEX18", 35, "");
      fssFld(23, 54, 0X000030, "PRT18", 20, "");
      fssFld(24, 7, 0X000030, "OFF19", 6, "");
      fssFld(24, 16, 0X000030, "HEX19", 35, "");
      fssFld(24, 54, 0X000030, "PRT19", 20, "");


/* ----- End of Generated Code ----- */

