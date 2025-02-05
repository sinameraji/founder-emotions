
  
  export function Footer() {
    return (
      <footer className="p-5 px-5 lg:px-10">
        <div className="flex items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-2">
           
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Created by <a href="https://learningloop.com" className="text-blue-500">LearningLoop.com</a> in LL launch week 2025
            </h2>
            
          </div>       
        </div>

              <div className="flex justify-center w-full">
                <a href="mailto:team@learningloop.com" className="text-blue-500">Contact us</a>
              </div>

      </footer>
    );
  }
  