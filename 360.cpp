#include <iostream>
#include <fstream>
void setMax(int &num, int& max) {
    if (max==-1) max=num; //return num;
    else if (max<num) max=num;//return num;
}

void setMin(int &num, int& min) {
    if (min==-1) min=num; //return num;
    else if (min>num) min=num; //return num;
}

int main() {
    int min = -1;
    int max = -1;
    int count=0;
    while (count<10) {
        int num;
        std::string numstring;
        std::cout<<"Enter one integer:";
        std::cin>>numstring;
        num=std::atoi(numstring.c_str());
        setMax(num,max);
        setMin(num,min);
        std::cout<<"Max: "<<max<<" Min: "<<min<<std::endl;
        count++;
   
    }
    std::cout<<"TEN INTEGERS REACHED"<<std::endl;
return 0;
}

