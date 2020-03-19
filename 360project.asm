setMinMax(int, int):
	push rbp
	push rbp, rsp
.L3:
	cmp eax, -1 ;if eax == -1, set both min and max to the 1st number in the array
	jne .L4
	mov eax, edx
	mov ebx, edx
	j .L7
.L4:
	cmp eax, edx
	jge .L5       ; if input number is >= to the min value (eax) then go the L5
	mov  eax, edx ; else set new min value
	
.L5:
	cmp ebx, edx
	jle .L7			; if the input number is <= to the max value (ebx) then go to L7
	mov ebx, edx 

.L7:
	pop rbp
	ret



getInput(int):
	push rbp
	mov rbp, rsp
	mov DWORD[rbp - 12], ecx
	mov edx, DWORD PTR[rbp + ecx]
	pop rbp
	ret
	
	
main: ;assume keyboard input is at memory location 1000 and each number is 1 byte
	push rbp
	mov rbp, rsp
	mov eax, -1;min number
	mov ebx, -1;max number
	mov ecx, 0
	
	
.L1: 
	cmp ecx, 10
	jge .L2
	call getInput(int)
	call setMinMax(int, int)
	add  ecx, 1
	j .L1
.L2:
	mov eax, 0
	pop rbp
	ret
	

	
	
	

	
